import { ParamType } from "ethers/lib/utils";
import { COMMON_CONFIG } from "../config/common";

var crypto = require('crypto');
const { ethers, utils } = require('ethers')

const createHash = crypto.createHash;
export function encrypt(data:any) {
	return createHash('sha256') // <-- You can use other than sha1
  		.update(data) //set what to encode
  		.digest('base64') //basically another way to encode. hex is base16 so for example doing .digest('base64') encodes 4x more effenciently
}




/**
 * 
 * @param data this is the user password 
 * @param hash this is the user password saved as an encrypted data on the database
 * @returns 
 */
export const compare=async(data: any,hash: any)=>{
  //hash user entered password
  let  hashed = encrypt(data)
  //compare user password to database passsword for user
  if (hash != hashed) {
    return false
  } else {
    return true
  }

}