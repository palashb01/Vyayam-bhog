import bcrypt from "bcrypt";

export const encrypt = async (arg) => {
  const salt = await bcrypt.genSalt();
  const encrypted = await bcrypt.hash(arg, salt);

  return encrypted;
};

export const decryptAndCompare = async (p, cp, callback) => {
  bcrypt
    .compare(p, cp)
    .then((isMatch) => {
      callback(isMatch);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
