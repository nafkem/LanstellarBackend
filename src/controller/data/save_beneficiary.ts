import { User } from "../../models/user.model";

/**
 * Saves beneficiary data for a user.
 * @param data - Object containing user ID and beneficiary data.
 * @returns An object indicating success if beneficiary data is saved successfully, 
 * or an error object if the saving fails.
 */
export const saveBeneficiary = async (data: any) => {
    try {
        // Extract user ID and beneficiary data from input data
        const { id, ...beneficiaryData } = data;

        // Find user by ID
        const user = await User.findOne({ _id: id });

        // If user is not found, return error
        if (!user) {
            return { statusCode: 302, error: 'User not found' };
        }
        
        // Check if beneficiary already exists
        const isThere = user.beneficiary.find((b: any) => b.phone === data["phone"]);
        if (isThere) {
            return { statusCode: 202, error: 'Beneficiary already exists' };
        }
        
        // Push new beneficiary data to user's beneficiary array
        const updatedUser = await User.findByIdAndUpdate(user._id,
            { $push: { beneficiary: beneficiaryData } }, { new: true }
        );
        
        // Save user changes
        await updatedUser?.save();
        
        // Return success response
        return { statusCode: 200, data: { success: true, message: "Saved successfully" } };
    } catch (error) {
        // Return error response if any unexpected error occurs
        return { statusCode: 400, data: error };
    }
}
