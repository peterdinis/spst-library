import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

type EmailTemplateProps = {
	email: string;
	subject: string;
};

const EmailTemplate = ({ email, subject }: EmailTemplateProps) => {
	const previewText = `Nový email pre 🚀${email}.`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="my-[20px] mx-auto p-[20px] max-w-4xl">
						<Heading className="text-black text-[20px] font-normal text-left">
							<strong>Ahoj {email},</strong>
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							{subject}
						</Text>

						<Hr className="my-[16px] mx-0 w-full" />
						<Text className="text-black text-[14px] leading-[24px]">
							admin@spstkniznica.sk
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default EmailTemplate;
