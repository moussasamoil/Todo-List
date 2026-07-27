import bcrypt from "bcrypt";

const saltOrRounds = 10;
const password = 'random_password';

export const hashPass = (password: string, salt: number) => {
    if (!salt) {
        salt = saltOrRounds;
    }
    const hash = bcrypt.hashSync(password, salt);
   console.log(hash);
   return hash;
}
