
import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { getGreeting } from "~/lib/getHour";

const resend = new Resend(process.env.RESEND_AUTH_KEY);

const greeting = getGreeting();

export async function POST(req: NextRequest) {
	const body = await req.json();

	const {email, bookName, from, to} = body;
	try {
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject: "Požičanie knihy",
			text: `${greeting} ${email} Kniha: ${bookName} bola úspešné požičaná. Knihu máte požičanú ${from} - ${to}. S pozdravom Admin SPŠT Knižnica.`,
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}
		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
