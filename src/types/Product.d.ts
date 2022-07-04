declare namespace Product {
  export interface ProductListRequest {
    Querystring: {
      limit?: number;
      order?: 'asc' | 'desc';
      page?: number;
      query?: string;
      sort?: string;
    };
  }

  export interface ProductListReply {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
    page: number;
    records: {
      createdAt: Date;
      createdBy: string;
      id: string;
      imageURL: string;
      sku: string;
      title: string;
      updatedAt: Date;
      updatedBy: string;
      version: number;
    }[];
    totalCount: number;
    totalPages: number;
  }

  export interface ProductDetailsRequest {
    Params: {
      sku: string;
    };
  }

  export interface ProductDetailsReply {
    error: string | null;
    product: {
      createdAt: Date;
      createdBy: string;
      id: string;
      imageURL: string;
      sku: string;
      title: string;
      updatedAt: Date;
      updatedBy: string;
      version: number;
    } | null;
  }

  export interface ProductCreate {
    sku: string;
    title: string;
  }

  export interface ProductCreateRequest {
    Body: ProductCreate;
  }

  export interface ProductCreateReply {
    error: string | null;
    product: {
      createdAt: Date;
      createdBy: string;
      id: string;
      imageURL: string;
      sku: string;
      title: string;
      updatedAt: Date;
      updatedBy: string;
      version: number;
    } | null;
  }

  export interface ProductUpdate {
    sku?: string;
    title?: string;
  }

  export interface ProductUpdateRequest {
    Body: ProductUpdate;
    Params: {
      sku: string;
    };
  }

  export interface ProductUpdateReply {
    error: string | null;
    product: {
      createdAt: Date;
      createdBy: string;
      id: string;
      imageURL: string;
      sku: string;
      title: string;
      updatedAt: Date;
      updatedBy: string;
      version: number;
    } | null;
  }

  export interface ProductUploadImageRequest {
    Params: {
      sku: string;
    };
  }

  export interface ProductUploadImageReply {
    error: string | null;
    product: {
      createdAt: Date;
      createdBy: string;
      id: string;
      imageURL: string;
      sku: string;
      title: string;
      updatedAt: Date;
      updatedBy: string;
      version: number;
    } | null;
  }

  export interface ProductDeleteRequest {
    Params: {
      sku: string;
    };
  }

  export interface ProductDeleteReply {
    error: string | null;
  }
}
