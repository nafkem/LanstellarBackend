export const validateLogin = async (data: any) => {


    const email = data["email"];
    const password = data["password"];

 

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Check if email, password, confirmPassword, firstName, lastName, or phone are empty, null, or undefined
  if (!email || !password) {
    return { statusCode: 400, message: "All fields are required" };
  }
    if (!emailRegex.test(email)) {
        return {statusCode:400,error: "Invalid email format"};
    }

    // Password length validation
    if (password.length < 6) {
        return {statusCode:400,error:"Password must be at least 6 characters long"};
    }

    
    // All validations passed
    return   {statusCode:200};
};
