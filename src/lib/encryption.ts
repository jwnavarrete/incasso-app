import CryptoJS from "crypto-js";

const secret = process.env.NEXT_PUBLIC_SECRET_KEY || "";

const encrypt = (data: object): string => {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, secret).toString();
};

const decrypt = (ciphertext: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error("Decryption failed: empty result");
    }
    return JSON.parse(decrypted);
  } catch (error) {
    // console.error("Decryption error:", error.message);
    return null; // or handle the error as needed
  }
};

export { encrypt, decrypt };
