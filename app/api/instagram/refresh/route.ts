import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RefreshResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

function secretsMatch(supplied: string, expected: string): boolean {
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(expected);

  return (
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
  );
}

export async function GET(request: Request) {
  const configuredSecret = process.env.INSTAGRAM_REFRESH_SECRET?.trim();

  if (!configuredSecret) {
    return NextResponse.json({ error: "Refresh not configured" }, { status: 500 });
  }

  const requestUrl = new URL(request.url);
  const authorization = request.headers.get("authorization");
  const bearerSecret = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : undefined;
  const suppliedSecret = bearerSecret || requestUrl.searchParams.get("secret") || "";

  if (!secretsMatch(suppliedSecret, configuredSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  if (!token) {
    return NextResponse.json({ error: "Access token not configured" }, { status: 500 });
  }

  const refreshUrl = new URL("/refresh_access_token", "https://graph.instagram.com");
  refreshUrl.search = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: token,
  }).toString();

  try {
    const response = await fetch(refreshUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Refresh failed", status: response.status },
        { status: response.status },
      );
    }

    const refresh = (await response.json()) as RefreshResponse;

    return NextResponse.json({
      access_token: refresh.access_token,
      token_type: refresh.token_type,
      expires_in: refresh.expires_in,
    });
  } catch {
    return NextResponse.json({ error: "Refresh failed", status: 502 }, { status: 502 });
  }
}
