import crypto from 'crypto';
// Import and load environment variables
require('dotenv').config();


export const encryptPrivateKeys = async (password: string): Promise<string> => {
    // Generate a random salt value
    const salt = crypto.randomBytes(16);

    // Derive a 32-byte key from the first secret key and the salt value using PBKDF2
    const key = crypto.pbkdf2Sync(`${process.env.CONCEALSECRETS}`+`${process.env.CONCEALSECRETS}`, salt, 100000, 32, 'sha512');

    // Generate a random 16-byte initialization vector (IV)
    const iv = crypto.randomBytes(16);

    // Encrypt the hashed password using the second secret key and the IV
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Concatenate the salt value, IV, and the encrypted hashed password to form the final password hash
    const finalHashedPassword = salt.toString('hex') + iv.toString('hex') + encrypted;

    // Return the final hashed password string
    return finalHashedPassword;
};

export const decryptPrivateKeys = async (hashedPassword: string): Promise<string> => {
    try {
        // Parse the salt and IV from the hashed password
        const salt = Buffer.from(hashedPassword.slice(0, 32), 'hex');

        const iv = Buffer.from(hashedPassword.slice(32, 64), 'hex');

        // Derive the key from the first secret key and the salt value using PBKDF2
        const key = crypto.pbkdf2Sync(`${process.env.CONCEALSECRETS}`+`${process.env.CONCEALSECRETS}`, salt, 100000, 32, 'sha512');

        // Decrypt the hashed password using the key and IV
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(hashedPassword.slice(64), 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error: any) {
        // Handle errors
        return error.toString();
    }
};

export const  isValidHexType = async(value: string):Promise< boolean> =>{
    const pattern = /^0x[0-9a-fA-F]{64}$/;
    return pattern.test(value);
  }
  