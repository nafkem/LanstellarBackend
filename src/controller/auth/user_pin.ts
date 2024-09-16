import { authResponse } from "../../middlewares/response.handlers"; 
import { User } from "../../models/user.model";
import { encrypt, compare } from '../../services/crypto';
import { validateResetPassword } from "../../utils/reset.validator";

/**
 * Sets or updates the PIN for a user.
 * @param data - Object containing user ID, old PIN, and new PIN.
 * @returns An object indicating success if PIN update is successful, 
 * or an error object if the update fails.
 */
export const SetUserPin = async (data: any) => {
  const pin = encrypt(data["newPin"]);
  const oldPin = data["oldPin"];
  const _id = data["id"];

  try {
    // Check if all required fields are provided
    if (!pin || !oldPin || !_id) return { statusCode: 302, error: 'All fields must be complete' };

    // Check if old PIN and new PIN are the same
    if (data["newPin"] === data["oldPin"]) return { statusCode: 302, error: 'Old PIN and new PIN cannot be the same' };

    // Find user by ID
    const user = await User.findById({ _id });

    // Check if user exists
    if (!user) 
      return { statusCode: 302, error: 'User not found' };

    // If user has default PIN, set the new PIN and mark isPinSet as true
    if (user.pin === "0") {
      if (oldPin.toString() !== user.pin) {
        return { statusCode: 302, error: 'Invalid old PIN code' };
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { pin: pin.toString(), isPinSet: true },
      });
      await updatedUser?.save();
      return { statusCode: 200, success: true };
    } else {
      // If user has a previous PIN, verify old PIN and update with the new PIN
      if (user.pin !== encrypt(oldPin.toString()))
        return { statusCode: 302, error: 'Invalid old PIN code' };
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { pin: pin.toString(), isPinSet: true },
      });
      await updatedUser?.save();
      return { statusCode: 200, data: { success: true } };
    }
  } catch (error) {
    // Return error response if any unexpected error occurs
    return { statusCode: 500, error };
  }
};
