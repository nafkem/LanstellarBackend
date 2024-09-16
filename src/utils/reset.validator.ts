export const validateResetPassword = async (data: any) => {


    const id = data["id"];
    const password = data["password"];
    const confirmPassword = data["confirmPassword"];



   if (!id|| !password || !confirmPassword ) 
    return { statusCode: 400, message: "All fields are required" };
  

    // Password complexity validation using regular expressions
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!passwordRegex.test(password)) 
        return {
            statusCode: 400,
            error:
                "Password must contain at least 1 uppercase letter, 1 digit, and 1 special character (@$!%*?&)",
        };
    

    // Password length validation
    if (password.length < 6) 
        return {statusCode:400,error:"Password must be at least 6 characters long"};
    

    // Confirm password validation
    if (password !== confirmPassword) 
        return {statusCode:400,error:"Passwords do not match"};
    

    // All validations passed
    return   {statusCode:200};
};
