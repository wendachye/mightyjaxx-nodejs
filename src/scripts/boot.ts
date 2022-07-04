import Users from 'src/models/Users';
import { generateHashPassword } from 'src/services/UserService';

export const createTestAccount = async () => {
  const email = 'admin@mightyjaxx.com';
  const password = 'password123456';
  const hashPassword = await generateHashPassword(password);

  await Users.create({
    email,
    password: hashPassword,
  });
};
