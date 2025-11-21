import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
   host: "smtp.gmail.com",
   port: 587,
   secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

export default class EmailService {
  static async sendPasswordResetEmail(to, token) {
    const link = `http://localhost:8080/sessions/restore-view?token=${token}`;

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to,
      subject: "Recuperación de contraseña",
      html: `
        <h2>Restablecer contraseña</h2>
        <p>Hacé clic en el botón para restablecer tu contraseña. El enlace expira en 1 hora.</p>
        <a href="${link}" style="
          padding: 10px 20px;
          background: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        ">Restablecer contraseña</a>
        <p>Si no solicitaste esto, podés ignorar el mensaje.</p>
      `
    });
  }
}
