import crypto from "node:crypto";
import { firestore } from "@/lib/firebase";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const COUNTER_COLLECTION_NAME = "visitorCounts";
const VISITOR_COLLECTION_NAME = "visitorCountVisitors";
const DEFAULT_NAMESPACE = "udaygoel.dev";
const DEFAULT_KEY_NAME = "portfolio-visitors";
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getCounterConfig(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const namespace = searchParams.get("namespace") ?? DEFAULT_NAMESPACE;
  const keyName = searchParams.get("keyName") ?? DEFAULT_KEY_NAME;
  const counterKey = `${namespace}_${keyName}`;
  const cookieName = namespace;

  return {
    counterKey,
    cookieName,
    counterRef: doc(firestore, COUNTER_COLLECTION_NAME, counterKey),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { counterRef } = getCounterConfig(request);
    const snapshot = await getDoc(counterRef);
    const count = snapshot.exists() ? Number(snapshot.data().count ?? 0) : 0;

    return NextResponse.json({ count });
  } catch {
    return NextResponse.json(
      { error: "Could not read visitor count from Firestore" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { counterKey, cookieName, counterRef } = getCounterConfig(request);
    const existingVisitorId = request.cookies.get(cookieName)?.value;
    const visitorId = existingVisitorId ?? crypto.randomUUID();
    const visitorRef = doc(
      firestore,
      VISITOR_COLLECTION_NAME,
      `${counterKey}_${visitorId}`,
    );

    const count = await runTransaction(firestore, async (transaction) => {
      const snapshot = await transaction.get(counterRef);
      const visitorSnapshot = await transaction.get(visitorRef);
      const currentCount = snapshot.exists()
        ? Number(snapshot.data().count ?? 0)
        : 0;

      if (visitorSnapshot.exists()) {
        return currentCount;
      }

      const updatedCount = currentCount + 1;

      transaction.set(
        counterRef,
        {
          count: updatedCount,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      transaction.set(visitorRef, {
        visitorId,
        counterKey,
        countedAt: serverTimestamp(),
      });

      return updatedCount;
    });

    const response = NextResponse.json({ count });

    if (!existingVisitorId) {
      response.cookies.set({
        name: cookieName,
        value: visitorId,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: VISITOR_COOKIE_MAX_AGE,
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: "Could not increment visitor count in Firestore" },
      { status: 500 },
    );
  }
}
