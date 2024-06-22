
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_AUTH_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'petter1@pobox.sk',
      subject: "SKUSKA",
      text: "SOSOSOSO"
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }
    console.log(data);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}