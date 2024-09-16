import { COMMON_CONFIG } from "../../config/common"


const Sib = require('sib-api-v3-sdk')
const currentYear = 2024;
//const sendEmailWeb = (key, senderEmail, appName, recipientEmail, clientLink) => {
export const sendOTPMail = (recipientEmail: string, name: any, otp: any) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = COMMON_CONFIG.SECURITY_KEY.MAIL_KEY;
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: COMMON_CONFIG.NETWORK_CONFIG.MAIL_SENDER,
    name: "Tokpay",
  };
  const receivers = [
    {
      email: recipientEmail,
    },
  ];



  const emailContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tokpay - Verify Email Address</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
              background-color: #0000; /* Changed background color to purple */
              margin: 0; /* Reset default margin */
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: #657277; /* Charcoal text color */
          }
  
          .container-body {
              max-width: auto;
              margin: 20px auto; /* Added margin at top and bottom */
              background-color: #F1F5F7; /* Changed background color to white */
              padding: 20px;
              text-align: center; /* Center align overall container */
              border-radius: 5px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added shadow effect */
          }
  
          .container {
              max-width: 400px;
              margin: 20px auto; /* Added margin at top and bottom */
              background-color: #ffffff; /* Changed background color to white */
              border-radius: 5px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added shadow effect */
              text-align: center; /* Center align overall container */
              padding: 50px; /* Added padding for the content inside the container */
          }
  
          .logo {
              font-size: 32px;
              font-weight: bold;
              color: #000; /* Black color for bold text */
          }
  
          .info {
              margin-top: 20px;
              color: #657277; /* Charcoal text color */
              text-align: center; /* Align text to the left */
          }
  
          .info p:not(:first-child) {
              margin-top: 0; /* Remove top margin for all paragraphs except the first one */
          }
  
          .info p:not(:last-child) {

              margin-bottom: 0; /* Remove bottom margin for all paragraphs except the last one */
          }
  
          .code-container {
            max-width: 400px;
              background-color: #f2f2f2; /* Light grey background for OTP container */
              border-radius: 5px; /* Added border radius */
              padding: 25px; /* Added padding */
              display: inline-block; /* Center the container */
          }
  
          .code {
              font-size: 32px;
              font-weight: bold;
              color: #000; /* Set color to black */
              margin: 0; /* Reset margin */
              line-height: 1; /* Center vertically */
          }
  
          .verify {
              font-size: 18px;
              font-weight: bold; /* Make it bold */
              color: #000; /* Set color to black */
              margin: 0; /* Reset margin */
              line-height: 1; /* Center vertically */
          }
  
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #657277; /* Charcoal text color */
          }
      </style>
  </head>
  <body>
      <div class="container-body">
          <div class="container">
              <div class="logo">Tokpay</div>
              <div class="info">
                  <p class="verify">Verify your email address</p> <!-- Modified paragraph -->
                  <p>Please verify your email address using the code below to log in. This verification code will expire in 5 minutes.</p>
              </div>
              <div class="code-container">
                  <div class="code">${otp}</div>
              </div>
              <div class="footer">

                  <p>&copy; ${currentYear} Tokpay Finance. All rights reserved.</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  
  
    `;

  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: `Verify your email address - ${otp}`,
    htmlContent: emailContent,
  });
};



export const sendEmailForgotPassword = (recipientEmail: string, user: any, otp: any) => {
  const client = Sib.ApiClient.instance
  const apiKey = client.authentications['api-key']
  apiKey.apiKey = COMMON_CONFIG.SECURITY_KEY.MAIL_KEY
  const tranEmailApi = new Sib.TransactionalEmailsApi()
  const sender = {
    email: COMMON_CONFIG.NETWORK_CONFIG.MAIL_SENDER,
    name: "Tokpay",
  }
  const receivers = [
    {
      email: recipientEmail,
    },
  ]
  const emailContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tokpay - Verify Email Address</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
              background-color: #0000; /* Changed background color to purple */
              margin: 0; /* Reset default margin */
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: #657277; /* Charcoal text color */
          }
  
          .container-body {
              max-width: auto;
              margin: 20px auto; /* Added margin at top and bottom */
              background-color: #F1F5F7; /* Changed background color to white */
              padding: 20px;
              text-align: center; /* Center align overall container */
              border-radius: 5px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added shadow effect */
          }
  
          .container {
              max-width: 400px;
              margin: 20px auto; /* Added margin at top and bottom */
              background-color: #ffffff; /* Changed background color to white */
              border-radius: 5px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added shadow effect */
              text-align: center; /* Center align overall container */
              padding: 50px; /* Added padding for the content inside the container */
          }
  
          .logo {
              font-size: 32px;
              font-weight: bold;
              color: #000; /* Black color for bold text */
          }
  
          .info {
              margin-top: 20px;
              color: #657277; /* Charcoal text color */
              text-align: center; /* Align text to the left */
          }
  
          .info p:not(:first-child) {
              margin-top: 0; /* Remove top margin for all paragraphs except the first one */
          }
  
          .info p:not(:last-child) {

              margin-bottom: 0; /* Remove bottom margin for all paragraphs except the last one */
          }
  
          .code-container {
            max-width: 400px;
              background-color: #f2f2f2; /* Light grey background for OTP container */
              border-radius: 5px; /* Added border radius */
              padding: 25px; /* Added padding */
              display: inline-block; /* Center the container */
          }
  
          .code {
              font-size: 32px;
              font-weight: bold;
              color: #000; /* Set color to black */
              margin: 0; /* Reset margin */
              line-height: 1; /* Center vertically */
          }
  
          .verify {
              font-size: 18px;
              font-weight: bold; /* Make it bold */
              color: #000; /* Set color to black */
              margin: 0; /* Reset margin */
              line-height: 1; /* Center vertically */
          }
  
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #657277; /* Charcoal text color */
          }
      </style>
  </head>
  <body>
      <div class="container-body">
          <div class="container">
              <div class="logo">Hi ${user}.</div>
              <div class="info">
                  <p class="verify">Recover Your Account</p> <!-- Modified paragraph -->
                  <p>Here is your one time password for account recovery, Use this to continue your recovery process.</p>
              </div>
              <div class="code-container">
                  <div class="code">${otp}</div>
              </div>
              <div class="footer">

                  <p>&copy; ${currentYear} Tokpay Finance. All rights reserved.</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  
  
    `;
  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: 'Recover your account',
    htmlContent: emailContent,
    params: {
      otp: otp,
    },
  })
}




module.exports = { sendOTPMail, sendEmailForgotPassword }