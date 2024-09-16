import { generateJwtToken } from "../../middlewares/jwt";
import { validateLogin } from "../../utils/login.validation";
import { User } from "../../models/user.model";
import { compare } from '../../services/crypto';
import { authResponse } from "../../middlewares/response.handlers";
import { decryptPrivateKeys } from "../../services/secure_privatekeys";

/**
 * Handles user login.
 * @param data - Object containing user login data (email and password).
 * @returns An object containing user data and authentication token if login is successful,
 * or an error object if login fails.
 */
export const Login = async (data: any) => {
  // Validate login data
  let check: any = await validateLogin(data);
  if (check["statusCode"] !== 200) {
    return check;
  } else {
    const email = data["email"];
    const password = data["password"];

    try {
      // Find user by email
      const user = await User.findOne({
        email,
      });

      // Check if user exists
      if (!user) {
        return { statusCode: 400, error: 'User not found' };
      }

      // Compare the provided password with the stored password hash
      const validPassword = await compare(password, user.password);
      let accessToken = generateJwtToken(user.id);

      // If password is invalid
      if (!validPassword) {
        return { statusCode: 302, error: 'Incorrect email or password' };
      }

      // Check if user account is activated
      if (user && !user.activated) {
        return { statusCode: 403, id: user.id, accessToken, error: 'Your account isn\'t activated yet. Please verify using OTP sent to your email.' };
      }


      
      // Populate authResponse object with user data
      authResponse['data']['id'] = user.id;
      authResponse['data']['email'] = user.email;
      authResponse['data']['name'] = user.name!;
      authResponse['data']['surname'] = user.surname!;
      authResponse['data']['phone'] = user.phone!;
      authResponse['data']['dateOfBirth'] = user.dob!;
      authResponse['data']['gender'] = user.gender!;
      authResponse['data']['network'] = user.network!;
      authResponse['data']['country'] = user.country!;
      authResponse['data']['created'] = user.created;
      authResponse['data']['active'] = user.activated;
      authResponse['data']['validated'] = user.validated;
      authResponse['data']['address'] = user.account.address;
      authResponse['data']['selfie'] = user.selfie ?? "";
      authResponse['data']['token'] = accessToken;
      authResponse['data']['banking'] = user.banking;
      authResponse['data']['isPinSet'] = user.isPinSet!;
      authResponse['data']['isLockPinSet'] = user.isLockPinSet!;

      // Return authResponse containing user data
      return authResponse;

    } catch (error) {
      // Return error response if any unexpected error occurs
      return { statusCode: 500, error };
    }
  }
}
