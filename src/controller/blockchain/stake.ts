

// import { User } from "../../models/user.model";
// import { handleContractError } from './errors';
// import { decryptPrivateKeys } from '../../services/secure_privatekeys';
// import { initContract, kit } from "../../utils/connection";

// export const stakeTBill = async (id: string, data: any) => {

//     try {

//         const amount = data["amount"]

//         const user = await User.findById({ _id: id })
//         //if he user is not found return this error
//         if (!user) {
//             return { statusCode: 302, error: 'User not found' };
//         }


//         let decrypted = await decryptPrivateKeys(user.account.privateKey);
     

//         let weiTransferAmount = kit.web3.utils.toWei(`${amount}`, "ether");
//         kit.connection.addAccount(decrypted)


//         const cUSDcontract = await kit.contracts.getStableToken()


//         const tx = await (await initContract()).methods
//             .stake( weiTransferAmount)
//             .send({ from: user.account.address, feeCurrency: cUSDcontract.address });
//         const hash = await tx.getHash()
//         console.log(`${hash}`);
//         await tx.waitReceipt().then((v: any) => {
//             console.log(`${v}`);
//         })

//         return { statusCode: 200, data: hash };
//     } catch (error) {
//         // Handling errors related to the contract and responding with an error message
//         handleContractError(error);
//     }
// };




