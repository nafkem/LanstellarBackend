import { authResponse } from "../../middlewares/response.handlers"; 
import { User } from "../../models/user.model";
import { encrypt, compare } from '../../services/crypto';
import { validateResetPassword } from "../../utils/reset.validator";

/**
 * Resets the password for a user.
 * @param data - Object containing user ID and new password.
 * @returns An object indicating success if password reset is successful, 
 * or an error object if reset fails.
 */
export const ResetUserPassword = async (data: any) => {
  // Encrypt the new password
  const hashedPassword = encrypt(data["password"]);
  const _id = data["id"];

  // Validate reset password data
  let check: any = await validateResetPassword(data);
  if (check["statusCode"] !== 200) {
    return check;
  } else {
    try {
      // Find user by ID
      const user = await User.findById({ _id });

      // Check if user exists
      if (!user) 
        return { statusCode: 302, error: 'User not found' };
      
      // Update user password
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { password: hashedPassword },
      });
      await updatedUser?.save();

      // Return success response
      return { statusCode: 200, data: { success: true } };
   
    } catch (error) {
      // Return error response if any unexpected error occurs
      return { statusCode: 500, error };
    }
  }
}
