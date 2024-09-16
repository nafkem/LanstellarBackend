import { generateJwtToken } from '../../middlewares/jwt';
import { authResponse } from '../../middlewares/response.handlers';
import { User } from '../../models/user.model';


/**
 * 
 * @param _id 
 * @param otp 
 * @returns 
 */
export const refreshToken = async (data:any) => {




  try {

    const _id=data["id"];

    //check for the user here
    const user = await User.findOne({
      _id,
    });

    //if the user is not found run this
    if (!user) {

      return { statusCode: 404, error: 'User not found' };
    }
 
      let accessToken=  generateJwtToken(user.id);

      return {statusCode:200, data:{success:true,id:user.id,token:accessToken}};
  } catch (error: any) {
    console.log(error)
    return { statusCode: 500, error };
  }


};