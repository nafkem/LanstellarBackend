import { User } from "../../models/user.model";

// Helper function to format phone numbers
const formatPhoneNumber = (phoneNumber: string): string => {
  phoneNumber = phoneNumber.replace(/\s/g, ''); // Remove spaces

  // Check for Nigerian format
  if (/^(\+234|0)?(70|80|81|90|91)\d{8}$/.test(phoneNumber)) {
    if (phoneNumber.length <= 10) {
      return '+234' + phoneNumber; // Prepend +234 if missing
    } else {
      return phoneNumber.replace(/^0/, '+234'); // Convert to +234 format
    }
  }

  // Check for Zambian format
  if (/^(\+260|0)?(77|76|95|97|96)\d{7}$/.test(phoneNumber)) {
    if (phoneNumber.length <= 9) {
      return '+260' + phoneNumber; // Prepend +260 if missing
    } else {
      return phoneNumber.replace(/^0/, '+260'); // Convert to +260 format
    }
  }

  return phoneNumber; // Return the original phone number if it doesn't match any of the above formats
};

/**
 * Finds users in the database based on provided phone contacts.
 * @param data - Object containing user ID and phone contacts.
 * @returns An object containing matching user data if successful, 
 * or an error object if the search fails.
 */
export const FindUsersInDatabase = async (data: any) => {
  const matchedUsers: any = [];
  const phonebookContacts = data["contacts"];
  const _id = data["id"];

  try {
    // Check if ID is provided
    if (!_id) {
      return { statusCode: 400, error: 'ID is required' };
    }
  
    // Check if phonebookContacts is provided and not empty
    if (!phonebookContacts || phonebookContacts.length === 0) {
      return { statusCode: 400, error: 'Phone contacts are required' };
    }
  
    // Store unique phone numbers in a set
    const phoneNumberSet = new Set<string>(
      phonebookContacts.map((contact: any) => formatPhoneNumber(contact.phone))
    );

    // Query MongoDB for matching users in batches
    const batchSize = 100; // Adjust batch size as needed
    const phoneNumbers = Array.from(phoneNumberSet);

    for (let i = 0; i < phoneNumbers.length; i += batchSize) {
      const batchPhoneNumbers = phoneNumbers.slice(i, i + batchSize);
      const batchUsers = await User.find(
        { phone: { $in: batchPhoneNumbers }, _id: { $ne: _id },activated: true},
        // Query for matching phone numbers
        { name: 1, surname: 1, phone: 1, "account.address": 1, selfie: 1, _id: 0 } // Project only required fields
      );
    

      // Extract required fields and push into matchedUsers
      batchUsers.forEach((user: any) => {

       
          const { name, surname, phone, account, selfie } = user;
          const { address } = account;
          matchedUsers.push({ name, surname, phone, address, selfie });
        
     
      });
    }

    return { statusCode: 200, data: matchedUsers };
  } catch (error) {
    // Handle error
    console.error('Error finding users:', error);
    return { statusCode: 500, error: 'Internal Server Error' };
  }
};
