import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "../db";
import { Lucia, TimeSpan } from "lucia";
import { env } from "~/env";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
    getSessionAttributes: (/* attributes */) => {
        return {};
      },
      getUserAttributes: (attributes: any) => {
        return {
          id: attributes.id,
          email: attributes.email,
          emailVerified: attributes.emailVerified,
          avatar: attributes.avatar,
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
})