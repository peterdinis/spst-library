import { z } from "zod";

export const signupSchema = z.object({
	name: z.string().min(5),
	lastName: z.string().min(5),
	email: z.string().email("Please enter a valid email"),
	password: z.string().min(1, "Please provide your password.").max(255),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
	email: z.string().email("Please enter a valid email."),
	password: z
		.string()
		.min(8, "Password is too short. Minimum 8 characters required.")
		.max(255),
});
export type LoginInput = z.infer<typeof loginSchema>;
