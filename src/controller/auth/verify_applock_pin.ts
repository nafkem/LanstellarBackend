import { isSixDigitNumber } from "../../utils/number.check";
import { authResponse } from "../../middlewares/response.handlers";
import { User } from "../../models/user.model";
import { encrypt, compare } from '../../services/crypto';
import { validateResetPassword } from "../../utils/reset.validator";

/**
 * Verifies the app lock PIN for a user.
 * @param data - Object containing user ID and PIN.
 * @returns An object indicating success if PIN verification is successful, 
 * or an error object if the verification fails.
 */
export const VerifyUserAppLockPin = async (data: any) => {
  const pin = encrypt(data["pin"]);
  const _id = data["id"];

  // Check if all required fields are provided
  if (!pin || !_id) return { statusCode: 302, error: 'All fields must be complete' };
  
  // Check if PIN is a six-digit number
  if (!isSixDigitNumber(data["pin"])) return { statusCode: 302, error: 'PIN must be six digits' };

  try {
    // Find user by ID
    const user = await User.findById({ _id });

    // If user is not found, return error
    if (!user)
      return { statusCode: 302, error: 'User not found' };

    // If user's app PIN does not match the provided PIN, return error
    if (user.appPin !== pin)
      return { statusCode: 302, error: 'Invalid PIN' };

    // Return success response
    return { statusCode: 200, success: true };
  } catch (error) {
    // Return error response if any unexpected error occurs
    return { statusCode: 500, error };
  }
};
