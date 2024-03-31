'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Scrypt } from 'lucia';
import { db } from '../../db';
import { lucia } from '../config';
import { LoginInput, loginSchema } from '../../validators/auth';
import { studentRedirects } from '../../utils';

export interface ActionResponse<T> {
    fieldError?: Partial<Record<keyof T, string | undefined>>;
    formError?: string;
}

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
            email
        }
    })
  
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