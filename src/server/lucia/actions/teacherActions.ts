"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";
import { db } from "../../db";
import { lucia } from "../config";
import {
	LoginInput,
	loginSchema,
	SignupInput,
	signupSchema,
} from "../../validators/auth";
import { validateRequest } from "../validate-request";
import { TRPCError } from "@trpc/server";
import { ActionResponse } from "~/app/types/sharedTypes";
import { teacherRedirects } from "~/server/utils";
import { TEACHER } from "../constants";

export async function login(
	_: unknown,
	formData: FormData,
): Promise<ActionResponse<LoginInput>> {
	const obj = Object.fromEntries(formData.entries());

	const parsed = loginSchema.safeParse(obj);
	if (!parsed.success) {
		const err = parsed.error.flatten();
		return {
			fieldError: {
				email: err.fieldErrors.email?.[0],
				password: err.fieldErrors.password?.[0],
			},
		};
	}

	const { email, password } = parsed.data;

	const existingUser = await db.user.findFirst({
		where: {
			email,
		},
	});

	if (!existingUser) {
		return {
			formError: "Používateľ nebol nájdený",
		};
	}

	if (!existingUser || !existingUser?.password) {
		return {
			formError: "Zlé heslo alebo email",
		};
	}

	const validPassword = await new Scrypt().verify(
		existingUser.password,
		password,
	);
	if (!validPassword) {
		return {
			formError: "Heslo nie je správne",
		};
	}

	const session = await lucia.createSession(String(existingUser.id), {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect(teacherRedirects.afterLogin);
}

export async function signup(
	_: unknown,
	formData: FormData,
): Promise<ActionResponse<SignupInput>> {
	const obj = Object.fromEntries(formData.entries());

	const parsed = signupSchema.safeParse(obj);
	if (!parsed.success) {
		const err = parsed.error.flatten();
		return {
			fieldError: {
				email: err.fieldErrors.email?.[0],
				password: err.fieldErrors.password?.[0],
			},
		};
	}

	const { email, password, name, lastName } = parsed.data;

	const existingUser = await db.user.findFirst({
		where: {
			email,
		},
	});

	if (existingUser) {
		return {
			formError: "Nepodarilo sa vytvoriť účet s týmto emailom",
		};
	}

	const userId = generateId(21);
	const hashedPassword = await new Scrypt().hash(password);

	const createNewTeacher = await db.user.create({
		data: {
			id: userId,
			email,
			name,
			lastName,
			password: hashedPassword,
			isTeacher: true,
			isActive: true,
			isStudent: false,
			isAdmin: false
		},
	});

	if (!createNewTeacher) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Nepodarilo sa vytvoriť nového používateľa",
		});
	}

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect(teacherRedirects.toLogin);
}

export async function logout(): Promise<{ error: string } | void> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Session nebola nájdená",
		};
	}
	await lucia.invalidateSession(session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/");
}
