import CryptoJS from "crypto-js";

const secret = process.env.NEXT_PUBLIC_SECRET_KEY || "";

const encrypt = (data: object): string => {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, secret).toString();
};

const decrypt = (ciphertext: string): any => {
  console.log(secret);
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  console.log("decrypted", decrypted);
  return JSON.parse(decrypted);
};

export { encrypt, decrypt };
