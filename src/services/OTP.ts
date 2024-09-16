const otpGenerator = require('otp-generator');
export const generateOTP = () => {
  const OTP = otpGenerator.generate(5, {lowerCaseAlphabets: false, upperCaseAlphabets: false,digit:true, specialChars: false });
  return OTP;
};

