// const multer = require('multer');
const axios = require('axios');
import { COMMON_CONFIG } from "../../config/common";
import { User } from "../../models/user.model";

/**
 * Updates user selfie image.
 * @param data - Object containing user ID and image data.
 * @returns An object containing the updated image URL if successful, 
 * or an error object if the update fails.
 */
export const Selfie = async (data: any) => {
  const _id = data["id"];
  let image = data["image"];

  // Check if user ID and image are provided
  if (_id === null) return { statusCode: 400, error: "id field cannot be empty" };
  if (image === null) return { statusCode: 400, error: "image field cannot be empty" };

  try {
    // Find user by ID
    const user = await User.findById({ _id });

    // Check if user exists
    if (!user)
      return { statusCode: 302, error: 'User not found' };

    // If image is provided, upload it to ImgBB and get the URL
    if (image !== null) {
      const imgapiKey = COMMON_CONFIG.SECURITY_KEY.IMGAPIKEY; // Replace with your ImgBB API key
      const url = `https://api.imgbb.com/1/upload?key=${imgapiKey}`;
  
      try {
        // Upload image using Axios
        const response = await axios.post(url, { image });
        const result = response.data;
  
        // If upload is successful, update user selfie with the image URL
        if (result.status !== 200) {
          console.log(result);
          image = "https://i.ibb.co/9wX2PQw/download.png"; // Default image URL if upload fails
        } else {
          image = result.data.display_url;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        image = "https://i.ibb.co/9wX2PQw/download.png"; // Default image URL if upload fails
      }
    } else {
      // If image is not provided, set a default image URL
      image = "https://i.ibb.co/9wX2PQw/download.png";
    }

    // Update user selfie with the image URL
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: { selfie: image },
    });
    await updatedUser?.save();

    // Return success response with the updated image URL
    return { statusCode: 200, data: { image: image } };
  } catch (error) {
    // Return error response if any unexpected error occurs
    return { statusCode: 500, error };
  }
};
