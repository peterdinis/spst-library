export const urlCheck =
	process.env.NODE_ENV === "development"
		? (process.env.NEXT_PUBLIC_AUTH_API as unknown as string)
		: (process.env.NEXT_DEPLOY_AUTH_API as unknown as string);
