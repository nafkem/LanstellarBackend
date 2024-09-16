
import { User } from "../models/user.model";


/**
 * 
 * @param _id  you should pass the user-id here
 * 
 * @returns this returns the user id as string
 */
export const getId = async (_id:any) => {

  try {
    const user = await User.findById({
      _id
    });

    if (!user) {
      return false;
    }
 
  
      //if it passes send the user data back
      return user.id
   
   
  } catch (error:any) {
    return  false
  }
 
};