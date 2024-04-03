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
import { studentRedirects } from "../../utils";
import { validateRequest } from "../validate-request";
import { TRPCError } from "@trpc/server";
import { ActionResponse } from "~/app/types/sharedTypes";

export async function login(
	_: any,
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
			formError: "Incorrect email or password",
		};
	}

	if (!existingUser || !existingUser?.password) {
		return {
			formError: "Incorrect email or password",
		};
	}

	const validPassword = await new Scrypt().verify(
		existingUser.password,
		password,
	);
	if (!validPassword) {
		return {
			formError: "Incorrect email or password",
		};
	}

	const session = await lucia.createSession(String(existingUser.id), {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect(studentRedirects.afterLogin);
}

export async function signup(
	_: any,
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
			formError: "Cannot create account with that email",
		};
	}

	const userId = generateId(21);
	const hashedPassword = await new Scrypt().hash(password);

	const createNewStudent = await db.user.create({
		data: {
			id: userId,
			email,
			name,
			lastName,
			password: hashedPassword,
			role: "ADMIN",
		},
	});

	if (!createNewStudent) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Could not create new student",
		});
	}

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect(studentRedirects.toLogin);
}

export async function logout(): Promise<{ error: string } | void> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "No session found",
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
