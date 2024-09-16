import { generateJwtToken } from '../../middlewares/jwt';
import { authResponse } from '../../middlewares/response.handlers';
import { User } from '../../models/user.model';

/**
 * Activates a user using OTP.
 * @param data - Object containing user ID and OTP.
 * @returns An object indicating success if validation is successful, 
 * or an error object if the validation fails.
 */
export const activateUser = async (data: any) => {
  try {
    const _id = data["id"];
    const otp = data["otp"];

    // Find user by ID
    const user = await User.findOne({
      _id,
    });

    // If user is not found, return error
    if (!user) {
      return { statusCode: 404, error: 'User not found' };
    }

    // If user's OTP is not set or does not match the provided OTP, return error
    if (user.otp === "0" || user.otp !== otp) {
      return { statusCode: 302, error: 'Invalid OTP' };
    }

    // Set the user to be activated and clear OTP
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: { activated: true, otp: "0" },
    });

    // Save user changes
    await updatedUser?.save();

    // Generate JWT token for user authentication
    let accessToken = generateJwtToken(user.id);

    // Return success response
    return { statusCode: 200, data: { success: true, id: user.id } };
  } catch (error: any) {
    // Return error response if any unexpected error occurs
    console.error(error);
    return { statusCode: 500, error };
  }
};
