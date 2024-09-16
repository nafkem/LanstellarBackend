export const validateRegistration = async (data: any) => {


    const email = data["email"];
    const password = data["password"];
    const confirmPassword = data["confirmPassword"];
    const firstName = data["name"];
    const lastName = data["surname"];
    const phone = data["phone"];

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if email, password, confirmPassword, firstName, lastName, or phone are empty, null, or undefined
    if (!email || !password || !confirmPassword || !firstName || !lastName || !phone)
        return { statusCode: 400, message: "All fields are required" };

    if (!emailRegex.test(email))
        return { statusCode: 400, error: "Invalid email format" };
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password))
          return { statusCode: 400, error: "Password must contain at least 1 capital letter, 1 number, and 1 special character" };
      
    // Password length validation
    if (password.length < 6)
        return { statusCode: 400, error: "Password must be at least 6 characters long" };


    // Confirm password validation
    if (password !== confirmPassword)
        return { statusCode: 400, error: "Passwords do not match" };


    // Text validation for first name and last name (no numbers or special characters)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName))
        return { statusCode: 400, error: "First name must contain only letters" };


    if (!nameRegex.test(lastName))
        return { statusCode: 400, error: "Last name must contain only letters" };


    // Phone number validation (allows only digits and optional plus sign at the beginning)
    const phoneRegex = /^\+?\d+$/;
    if (!phoneRegex.test(phone))
        return { statusCode: 400, error: "Invalid phone number format" };


    // All validations passed
    return { statusCode: 200 };
};
