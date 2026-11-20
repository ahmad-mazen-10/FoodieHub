import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "temp.ethereal.mail",
    port: 567,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: testAccount.user,
    to,
    subject,
    text,
  });
  console.log("preview:", nodemailer.getTestMessageUrl(info));
}
