

import { User } from "../../models/user.model";


/**
 * 
 * @param id pass user id here
 * @returns returns data from the user
 */
export const getUserTBILLTransactions = async (id: any) => {

    try {

        //check for the user here
        const user = await User.findOne({
            _id:id,
        });

        //if he user is not found return this error
        if (!user) {
            return { statusCode: 302, error: 'User not found' };
        }

        return { statusCode: 200, data: user.tbillHistory };
    } catch (error) {
        return { statusCode: 400, data: error };
    }
}