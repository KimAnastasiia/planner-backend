/* eslint-disable prettier/prettier */
const nodemailer = require('nodemailer');

export const outlookEmail = 'mycalendarnew@outlook.com';
const outlookPassword = '5*NwP27zbO9!';

export const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection: false,
    tls: { ciphers: 'SSLv3' },
    auth: {
      user: outlookEmail,
      pass: outlookPassword,
    },
  });
