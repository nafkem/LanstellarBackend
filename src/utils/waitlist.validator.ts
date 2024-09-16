import web3 from "web3";

export const validateWaitlist = async (data: any) => {


    const email = data["email"];
    const firstName = data["firstName"];
    const lastName = data["lastName"];
    const wallet = data["wallet"];

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if email, password, confirmPassword, firstName, lastName, or phone are empty, null, or undefined
    if (!email || !wallet  || !firstName || !lastName)
        return { statusCode: 400, message: "All fields are required" };

    if (!emailRegex.test(email))
        return { statusCode: 400, error: "Invalid email format" };


// var valid=web3.utils.toChecksumAddress(wallet);
// try {
//     if(web3.utils.checkAddressCheckSum(valid))return  { statusCode: 400, message: "Invalid EVM Address" };  
// } catch (error) {
//     return  { statusCode: 400, message: error };  
// }
 



    // Text validation for first name and last name (no numbers or special characters)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName))
        return { statusCode: 400, error: "First name must contain only letters" };


    if (!nameRegex.test(lastName))
        return { statusCode: 400, error: "Last name must contain only letters" };



    // All validations passed
    return { statusCode: 200 };
};
