declare namespace Model {
  export interface User {
    accessTokens: {
      accessToken: string;
      expireIn: number;
    }[];
    createdAt: Date;
    email: string;
    password: string;
    updatedAt: Date;
    version: number;
  }

  export interface Product {
    createdAt: Date;
    createdBy: Types.ObjectId;
    deletedAt: Date;
    deletedBy: Types.ObjectId;
    imageURL: string;
    isDeleted: boolean;
    sku: string;
    status: string;
    title: string;
    updatedAt: Date;
    updatedBy: Types.ObjectId;
    version: number;
  }
}
