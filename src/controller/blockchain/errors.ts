/**
 * @dev Handles errors related to the Ethereum smart contract and responds with an error message.
 * @param {Express.Response} res - Express response object.
 * @param {Error} error - The error object representing the contract-related error.
 */
export const handleContractError = ( error:any) => {
    console.error('Contract error:', error);
    return { statusCode: 500, error: error };
  };