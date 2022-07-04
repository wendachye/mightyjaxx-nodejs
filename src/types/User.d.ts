declare namespace User {
  export interface UserRegisterRequest {
    email: string;
    password: string;
  }

  export interface UserRegisterReply {
    error: string | null;
    user: {
      createdAt: Date;
      email: string;
      id: string;
      updatedAt: Date;
      version: number;
    } | null;
  }

  export interface UserLoginRequest {
    email: string;
    password: string;
  }

  export interface UserLoginReply {
    accessToken: {
      accessToken: string;
      expiresIn: number;
    } | null;
    error: string | null;
  }

  export interface UserProfileReply {
    error: string | null;
    profile: {
      createdAt: Date;
      email: string;
      id: string;
      updatedAt: Date;
      version: version;
    } | null;
  }
}
