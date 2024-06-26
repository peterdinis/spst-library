import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { getGreeting } from "~/lib/getHour";

const resend = new Resend(process.env.RESEND_AUTH_KEY!);

const greeting = getGreeting();

interface RequestBody {
  email: string;
  bookName: string;
}

interface ResendResponse {
  data: unknown;
  error: unknown;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { email, bookName } = body;

    const response: ResendResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Vrátenie knihy",
      text: `${greeting} ${email} Kniha: ${bookName} bola úspešné vrátená. S pozdravom Admin SPŠT Knižnica.`,
    });

    if (response.error) {
      return Response.json({ error: response.error }, { status: 500 });
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}