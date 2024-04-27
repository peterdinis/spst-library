import { cache } from "react";
import { cookies } from "next/headers";
import { Session } from "lucia";
import { lucia } from "./config";
import { User } from "@prisma/client";

export const uncachedValidateRequest = async (): Promise<
	{ user: User | any; session: Session } | { user: null; session: null }
> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return { user: null, session: null };
	}
	const result = await lucia.validateSession(sessionId);
	console.log("Result", result);
	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {
		throw new Error("Failed to set session cookie");
	}
	return result;
};

export const validateRequest = cache(uncachedValidateRequest);
