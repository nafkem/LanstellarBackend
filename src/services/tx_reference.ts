const otpGenerator = require('otp-generator');


export const generateReference = () => {
  const REF = otpGenerator.generate(24, {lowerCaseAlphabets: false, upperCaseAlphabets: false,digit:true, specialChars: false });
  return REF;
};