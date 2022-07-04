import bcrypt from 'bcryptjs';
import { ACCESS_TOKEN_EXPIRE_TIME } from 'src/constants/common';
import Users from 'src/models/Users';

export const generateHashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(8);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

const generateJWTToken = (
  email: string,
  password: string,
  expiresIn = ACCESS_TOKEN_EXPIRE_TIME
) => {
  const accessToken = global.fastify.jwt.sign({ email, password }, { expiresIn });
  return {
    accessToken,
    expiresIn,
  };
};

export const register = async (
  email: string,
  password: string
): Promise<User.UserRegisterReply> => {
  const users = await Users.find({ email }).lean();

  if (users.length > 0) {
    return {
      error: 'User already exists',
      user: null,
    };
  }

  const hashPassword = await generateHashPassword(password);

  const newUser = await Users.create({
    email,
    password: hashPassword,
  });

  const { _id, email: userEmail, createdAt, updatedAt, version } = newUser.toObject();

  return {
    error: null,
    user: {
      createdAt,
      email: userEmail,
      id: _id.toString(),
      updatedAt,
      version,
    },
  };
};

export const login = async (email: string, password: string): Promise<User.UserLoginReply> => {
  const user = await Users.findOne({ email }).lean();

  if (!user) {
    return {
      accessToken: null,
      error: 'User not found',
    };
  }

  const verifiedPassword = await verifyPassword(password, user.password);

  if (!verifiedPassword) {
    return {
      accessToken: null,
      error: 'Password is incorrect',
    };
  }

  const { accessToken, expiresIn } = generateJWTToken(email, password);

  await Users.findOneAndUpdate(
    { email },
    { accessTokens: [...user.accessTokens, { accessToken, expiresIn }] }
  );

  return {
    accessToken: {
      accessToken,
      expiresIn,
    },
    error: null,
  };
};

export const logout = async (userId: string, accessToken: string) => {
  const user = await Users.findOne({ _id: userId });

  if (!user) {
    return 'User not found';
  }

  await Users.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      accessTokens: [...user.accessTokens.filter(item => item.accessToken !== accessToken)],
    }
  );
};

export const profile = async (userId: string): Promise<User.UserProfileReply> => {
  const userProfile = await Users.findOne({ _id: userId }).lean();

  if (!userProfile) {
    return {
      error: 'User not found',
      profile: null,
    };
  }

  const { createdAt, updatedAt, email, _id, version } = userProfile;

  return {
    error: null,
    profile: {
      createdAt,
      email,
      id: _id.toString(),
      updatedAt,
      version,
    },
  };
};
