import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "../db";
import { Lucia, TimeSpan } from "lucia";
import { env } from "~/env";
import { User } from "@prisma/client";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	getSessionAttributes: () => {
		return {};
	},
	getUserAttributes: (attributes: any) => {
		return {
			id: attributes.id,
			name: attributes.name,
			lastName: attributes.lastName,
			email: attributes.email,
			password: attributes.password,
			isActive: attributes.isActive,
			createdAt: attributes.createdAt,
			updatedAt: attributes.updatedAt,
		};
	},
	sessionExpiresIn: new TimeSpan(30, "d"),
	sessionCookie: {
		name: "session",

		expires: false, // session cookies have very long lifespan (2 years)
		attributes: {
			secure: env.NODE_ENV === "production",
		},
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<User, "hashedPassword"> {}
