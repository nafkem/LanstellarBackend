import { generateReference } from "../../services/tx_reference";
import { User } from "../../models/user.model";

/**
 * 
 * @param id pass user id here
 * @returns returns data from the user
 */
export const saveTransfer = async (data: any) => {

    // This generates a one time OTP
    const { id, ...tx } = data;
    console.log(data);
  
    try {

        // Check for the user here
        const user = await User.findOne({
            _id: id,
        });

        // If the user is not found, return this error
        if (!user) {
            return { statusCode: 302, error: 'User not found' };
        }

        // Generate a unique reference
        let reference = await generateReference();

        // Check if the reference already exists
        let referenceExists = await User.exists({ "transferHistory.reference": reference });

        // If the reference already exists, generate a new one until it's unique
        while (referenceExists) {
            reference = await generateReference();
            referenceExists = await User.exists({ "transferHistory.reference": reference });
        }
        const currentTimeUTC = new Date().toISOString()
        console.log(currentTimeUTC);

        data["reference"] = reference;
        data["createdAt"] = currentTimeUTC;
        // Update the user's transfer history
        const updatedUser = await User.findByIdAndUpdate(user._id,
            { $push: { transferHistory: data } }, { new: true }
        );

        await updatedUser?.save();

        return { statusCode: 200, data: { success: true, data: "saved successfully" } };
    } catch (error) {
        return { statusCode: 400, data: error };
    }
}
