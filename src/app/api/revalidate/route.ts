import {
  isValidSignature,
  SIGNATURE_HEADER_NAME,
} from "@sanity/webhook";
import { revalidateTag } from "next/cache";

import { SANITY_CONTENT_TAG } from "@/sanity/cache";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "Webhook secret is not configured." },
      { status: 503 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  const isValid = await isValidSignature(body, signature, secret);

  if (!isValid) {
    return Response.json(
      { revalidated: false, message: "Invalid webhook signature." },
      { status: 401 },
    );
  }

  revalidateTag(SANITY_CONTENT_TAG, { expire: 0 });

  return Response.json({ revalidated: true, now: Date.now() });
}
