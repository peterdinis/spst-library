import { cache } from "react";
import { cookies } from "next/headers";
import type { Session, User } from "lucia";
import { lucia } from "./config";

export const uncachedValidateRequest = async (): Promise<
	{ user: User; session: Session } | { user: null; session: null }
> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return { user: null, session: null };
	}
	const result = await lucia.validateSession(sessionId);
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
