import { validateRegistration } from "../../utils/register.validator";
import { encrypt } from '../../services/crypto';
import { generateOTP } from '../../services/OTP';
import { User } from '../../models/user.model';
const { ethers } = require('ethers');
import {  encryptPrivateKeys } from '../../services/secure_privatekeys';
import { sendOTPMail } from '../../services/mailing/Mail';
import { CONSTANTS } from "../../config/constants";

var cw = require('crypto-wallets');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Registers a new user.
 * @param data - Object containing user registration data.
 * @returns An object containing user data if registration is successful,
 * or an error object if registration fails.
 */
export const Register = async (data: any) => {
  // Validate registration data
  let check: any = await validateRegistration(data);
  if (check["statusCode"] !== 200) {
    return check;
  } else {
    const email = data["email"];
    const password = data["password"];
    const confirmPassword = data["confirmPassword"];
    const name = data["name"];
    const surname = data["surname"];
    const phone = data["phone"];
    // This array is created to hold all accounts
    const arr = [];

    // Default PIN values
    const pin = "0";
    const appPin = "000000";

    // Encrypt passwords
    const hashedPassword = encrypt(password);
    const hashedConfirmPassword = encrypt(confirmPassword);

    // Generate OTP for verification
    const otpGenerated = generateOTP();

    // Check if user with the same email already exists
    const user = await User.findOne({ phone });

    try {
      // Check if passwords match
      if (hashedPassword !== hashedConfirmPassword) {
        return { statusCode: 302, data: CONSTANTS.AUTH_MESSAGES.ISNOTMATCH };
      }
      // Check if email or phone number is already registered
      if (email === user?.email)
        return { statusCode: 404, data: CONSTANTS.AUTH_MESSAGES.EMAIL_EXIST };
      if (phone === user?.phone)
        return { statusCode: 404, data: CONSTANTS.AUTH_MESSAGES.PHONE_NUMBER_EXIST };

      // Create new user
      const newUser = await User.create({
        email,
        name,
        surname,
        phone,
        password: hashedPassword,
        otp: otpGenerated,
        pin,
        dob: data["dob"],
        country: data["country"],
        network: data["network"],
        gender: data["gender"],
        appPin,
        isPinSet: false,
        isLockPinSet: false,
        selfie: "https://i.ibb.co/jgJSSF9/2132e3146772.jpg"
      });

      // Handle user creation errors
      if (!newUser) {
        return { statusCode: 404, data: CONSTANTS.MESSAGES.ERROR_OCCURED };
      }

      const wallet = ethers.Wallet.createRandom();

      let encryptedPrivateKey = await encryptPrivateKeys(wallet.privateKey.toString());

      try {
        // Attach user's wallet data (from BVN and newly created wallet) to their profile
        const updatedUser = await User.findByIdAndUpdate(newUser._id, {
          $set: { account: { "address": wallet.address.toString(), "privateKey": encryptedPrivateKey } },
        });

        // Save updated user data
        await updatedUser?.save();

        // Send OTP verification email
        await sendOTPMail(email, updatedUser?.name!, otpGenerated);

        // Return success response
        let userId = newUser.id;
        return { statusCode: 200, data: { success: true, id: userId } };
      } catch (error) {
        // Handle errors during user profile update
        return { statusCode: 400, error: error };
      }
    } catch (error) {
      // Handle unexpected errors during registration process
      return { statusCode: 500, error: error };
    }
  };
}
