import { isSixDigitNumber } from "../../utils/number.check";
import { User } from "../../models/user.model";
import { encrypt, compare } from '../../services/crypto';

/**
 * Sets or updates the app lock PIN for a user.
 * @param data - Object containing user ID, old PIN, and new PIN.
 * @returns An object indicating success if PIN update is successful, 
 * or an error object if the update fails.
 */
export const SetUserAppLockPin = async (data: any) => {
  const pin = encrypt(data["newPin"]);
  const oldPin = data["oldPin"];
  const _id = data["id"];

  try {
    // Check if all required fields are provided
    if (!pin || !oldPin || !_id) return { statusCode: 302, error: 'All fields must be complete' };

    // Check if new PIN is a six-digit number
    if (!isSixDigitNumber(data["newPin"])) return { statusCode: 302, error: 'PIN must be six digits' };

    // Check if old PIN and new PIN are the same
    if (data["newPin"] === data["oldPin"]) return { statusCode: 302, error: 'Old PIN and new PIN cannot be the same' };

    // Find user by ID
    const user = await User.findById({ _id });

    // Check if user exists
    if (!user)
      return { statusCode: 302, error: 'User not found' };

    // If user has default PIN, set the new PIN and mark isLockPinSet as true
    if (user.appPin === "000000") {
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { appPin: pin.toString(), isLockPinSet: true },
      });
      await updatedUser?.save();
      return { statusCode: 200, success: true };
    } else {
      // If user has a previous PIN, verify old PIN and update with the new PIN
      if (user.appPin !== encrypt(oldPin.toString()))
        return { statusCode: 302, error: 'Invalid old PIN code' };
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { appPin: pin.toString() },
      });
      await updatedUser?.save();
      return { statusCode: 200, data: { success: true } };
    }
  } catch (error) {
    // Return error response if any unexpected error occurs
    return { statusCode: 500, error };
  }
};
