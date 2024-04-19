"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { FC, ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

const PHPProvider: FC<Props> = ({ children }: Props) => {
	if (typeof window !== "undefined") {
		posthog.init(
			process.env.NEXT_PUBLIC_POSTHOG_TOKEN as unknown as string,
			{
				api_host: "https://eu.posthog.com",
			},
		);
	}
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PHPProvider;
