
import { Resend } from 'resend';
import { EmailTemplate } from '~/app/_components/shared/EmailTemplate';

const resend = new Resend(process.env.RESEND_AUTH_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['pdinis1@gmail.com'],
      text: "Skuska",
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}