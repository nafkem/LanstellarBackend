export const isSixDigitNumber=(str: string): boolean=> {
    // Regular expression for 6 digits, handles both positive and negative numbers
    const regex = /^[-+]?\d{6}$/;
  
    // Efficiently check length and pattern match
    return str.length === 6 && regex.test(str);
  }