import nodemailer from 'nodemailer';
import nodeMailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = nodeMailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...nodeMailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
