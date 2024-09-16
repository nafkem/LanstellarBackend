// import { User } from "../../models/user.model";
// import { handleContractError } from './errors';
// import { decryptPrivateKeys } from '../../services/secure_privatekeys';
// import { kit } from "../../utils/connection";
// import { COMMON_CONFIG } from "../../config/common";

// export const approveCusd = async (id: string, data: any) => {

//     try {

//         const amount = data["amount"]

//         const user = await User.findById({ _id: id })
//         //if he user is not found return this error
//         if (!user) {
//             return { statusCode: 302, error: 'User not found' };
//         }

//         let decrypted = await decryptPrivateKeys(user.account.privateKey);
//         console.log('Decrypted:', decrypted);

//         let weiTransferAmount = kit.web3.utils.toWei(`${amount}`, "ether");
//         kit.connection.addAccount(decrypted)

//         const cUSDcontract = await kit.contracts.getStableToken()

//         const approveTx = await cUSDcontract.approve(COMMON_CONFIG.NETWORK_CONFIG.TBILL_VAULT_ADDRESS, weiTransferAmount)
//             .send();

  
//         console.log(`${approveTx}`);

//         await approveTx.waitReceipt().then((approveReceipt:any) => {
//             console.log(`${approveReceipt}`);
//         })

//         return { statusCode: 200, data: approveTx };
//     } catch (error) {
//         // Handling errors related to the contract and responding with an error message
//         handleContractError(error);
//     }
// };

