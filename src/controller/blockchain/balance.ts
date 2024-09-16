// import { kit } from "../../utils/connection";
// import { User } from "../../models/user.model";
// import { handleContractError } from "./errors";

// export const getBalanceOfAccount = async (id: any) => {
//     try {
//       const user = await User.findById({ _id: id })
//       //if he user is not found return this error
//       if (!user) {
//         return { statusCode: 302, error: 'User not found' };
//       }
    
//       const stableTokenWrapper = await kit.contracts.getStableToken()
  
//       let balance = await stableTokenWrapper.balanceOf(user.account.address);
   
//       return { statusCode: 200, data:parseFloat(balance.toString())/1000000000000000000};
//     } catch (error) {
//       // Handling errors related to the contract and responding with an error message
//       handleContractError(error);
//     }
//   }
  