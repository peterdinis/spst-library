import { z } from "zod";

export const signupSchema = z.object({
	name: z.string().min(5),
	lastName: z.string().min(5),
	email: z.string().email("Zadajte správny a valídny email"),
	password: z.string().min(1, "Zadajte valídne heslo.").max(255),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
	email: z.string().email("Zadajte správny a valídny email."),
	password: z
		.string()
		.min(8, "Heslo musí mať miminálne 8 znakov")
		.max(255),
});
export type LoginInput = z.infer<typeof loginSchema>;
