/* eslint-disable prettier/prettier */
import { outlookEmail, transporter } from 'src/utils/emailData';

export const sendEmail=async(email:string,title:string,message:string )=>{
  
  // Email options
  const mailOptions = {
    from: outlookEmail,
    to:email,
    subject:title,
    text: message,
  };

   // Send emaila
   const sendMailPromise = new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred:', error.message);
        reject(error);
      } else {
        console.log('Email sent successfully!', info.response);
        resolve();
      }
    });
  });
  await sendMailPromise;

  const timerId = setInterval(() => {
    // Ваша функция, которую нужно выполнить каждые 30 секунд
    console.log("Функция выполняется каждые 30 секунд");
  }, 30000);

  clearInterval(timerId); // Остановка таймера

 }