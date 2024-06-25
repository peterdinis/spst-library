import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { getGreeting } from "~/lib/getHour";

const resend = new Resend(process.env.RESEND_AUTH_KEY);

const greeting = getGreeting();

interface RequestBody {
  email: string;
  bookName: string;
}

interface ResendResponse {
  data?: unknown;
  error?: unknown;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { email, bookName } = body;

    const { data, error }: ResendResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Predlženie knihy",
      text: `${greeting} ${email} Kniha: ${bookName} bola úspešné predlžená. S pozdravom Admin SPŠT Knižnica.`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}