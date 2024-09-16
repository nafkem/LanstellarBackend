
import { generateJwtToken } from "../../middlewares/jwt";
import { authResponse } from "../../middlewares/response.handlers";
import { User } from "../../models/user.model";

import { sendEmailForgotPassword, sendOTPMail } from '../../services/mailing/Mail';
import { generateOTP } from '../../services/OTP';

/**
 * 
 * @param email pass user email here
 * @returns returns data from the user
 */
export const forgotPassword = async (data: any) => {

    //this generates a one time OTP
    const otpGenerated = generateOTP();
    const email = data["email"];
    try {

        //check for the user here
        const user = await User.findOne({
            email,
        });

        //if he user is not found return this error
        if (!user) {
            return { statusCode: 302, error: 'User not found' };
        }
        //this will send a mail to the user comtaining their  OTP 



        //This udates the OTP stored on the users data
        // so that it can be matched from user input
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $set: { otp: otpGenerated },
        });
        //save the OTP
        await updatedUser?.save();

        let userId = user.id
       
         await sendEmailForgotPassword(
            email,
            updatedUser?.name!,
            otpGenerated

        );
    
      
        let accessToken = generateJwtToken(userId);
        return { statusCode: 200, data: { success: true, id: userId,email:user.email } };
    } catch (error) {
        return { statusCode: 400, data: error };
    }
}