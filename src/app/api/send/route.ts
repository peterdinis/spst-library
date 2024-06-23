import { NextRequest } from "next/server";
import { Resend } from "resend";
import { getGreeting } from "~/lib/getHour";

const resend = new Resend(process.env.RESEND_AUTH_KEY);

const greeting = getGreeting();

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    /* TODO: Dostať tu email a nahradiť from a dostať tu aj inú hodnotu pre to */
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NEXT_PUBLIC_TESTING_EMAIL as unknown as string,
      subject: "Potvrdenie registrácie",
      text: `${greeting} ${
        process.env.NEXT_PUBLIC_TESTING_EMAIL as unknown as string
      }. Vaša registrácia do applikácie bola úspešná. S pozdravom Admin SPŠT Knižnica.`,
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }
    console.log(data);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
