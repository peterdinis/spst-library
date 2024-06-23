"use client"

import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { useToast } from "~/components/ui/use-toast";
import { getGreeting } from "~/lib/getHour";

const resend = new Resend(process.env.RESEND_AUTH_KEY);

const greeting = getGreeting();

export async function POST(req: NextRequest) {
	const {toast} = useToast();
	const body = await req.json();

	const email = body.email;
	try {
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject: "Potvrdenie registrácie",
			text: `${greeting} ${email}. Vaša registrácia do applikácie bola úspešná. S pozdravom Admin SPŠT Knižnica.`,
		});

		if (error) {
			toast({
				title: "Nastala chyba pri posielaní emailu",
				duration: 2000,
				className: "bg-red-500 text-white font-bold"
			})
			return Response.json({ error }, { status: 500 });
		}
		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
