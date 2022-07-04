import Products from 'src/models/Products';

export const productList = async (
  page: number,
  limit: number,
  sort: string,
  order: string,
  queryString: string
): Promise<Product.ProductListReply> => {
  const searchRgx = new RegExp(`.*${queryString}.*`);

  const query = {
    $or: [
      { sku: { $options: 'i', $regex: searchRgx } },
      { title: { $options: 'i', $regex: searchRgx } },
    ],
    isDeleted: false,
  };

  const options = {
    limit,
    page,
    ...(sort && { sort: { [sort]: order } }),
  };

  const products = await Products.paginate(query, options);

  const records = products.docs.map(product => {
    return {
      createdAt: product.createdAt,
      createdBy: product.createdBy.toString(),
      id: product._id.toString(),
      imageURL: product.imageURL,
      sku: product.sku,
      title: product.title,
      updatedAt: product.updatedAt,
      updatedBy: product.updatedBy.toString(),
      version: product.version,
    };
  });

  return {
    hasNextPage: products.hasNextPage,
    hasPreviousPage: products.hasPrevPage,
    limit: products.limit,
    page: products.page || page,
    records,
    totalCount: products.totalDocs,
    totalPages: products.totalPages,
  };
};

export const productDetails = async (sku: string): Promise<Product.ProductDetailsReply> => {
  const product = await Products.findOne({
    isDeleted: false,
    sku,
  }).lean();

  if (!product) {
    return {
      error: 'Product not found',
      product: null,
    };
  }

  return {
    error: null,
    product: {
      createdAt: product.createdAt,
      createdBy: product.createdBy.toString(),
      id: product._id.toString(),
      imageURL: product.imageURL,
      sku: product.sku,
      title: product.title,
      updatedAt: product.updatedAt,
      updatedBy: product.updatedBy.toString(),
      version: product.version,
    },
  };
};

export const createProduct = async (
  userId: string,
  productCreate: Product.ProductCreate
): Promise<Product.ProductCreateReply> => {
  const productExists = await Products.find({
    isDeleted: false,
    sku: productCreate.sku,
  }).lean();

  if (productExists.length) {
    return {
      error: 'SKU already exists',
      product: null,
    };
  }

  const newProduct = await Products.create({
    ...productCreate,
    createdBy: userId,
    updatedBy: userId,
  });

  const product = newProduct.toObject();

  return {
    error: null,
    product: {
      createdAt: product.createdAt,
      createdBy: product.createdBy.toString(),
      id: product._id.toString(),
      imageURL: product.imageURL,
      sku: product.sku,
      title: product.title,
      updatedAt: product.updatedAt,
      updatedBy: product.updatedBy.toString(),
      version: product.version,
    },
  };
};

export const updateProduct = async (
  sku: string,
  productUpdate: Product.ProductUpdate
): Promise<Product.ProductUpdateReply> => {
  const product = await Products.findOneAndUpdate(
    { isDeleted: false, sku },
    { ...productUpdate },
    { new: true }
  ).lean();

  if (!product) {
    return {
      error: 'Product not found',
      product: null,
    };
  }

  return {
    error: null,
    product: {
      createdAt: product.createdAt,
      createdBy: product.createdBy.toString(),
      id: product._id.toString(),
      imageURL: product.imageURL,
      sku: product.sku,
      title: product.title,
      updatedAt: product.updatedAt,
      updatedBy: product.updatedBy.toString(),
      version: product.version,
    },
  };
};

export const uploadProductImage = async (
  sku: string,
  filename: string
): Promise<Product.ProductUploadImageReply> => {
  const imagePath = `/images/products/${filename}`;

  const product = await Products.findOneAndUpdate(
    { isDeleted: false, sku },
    { imageURL: imagePath },
    { new: true }
  );

  if (!product) {
    return {
      error: 'Product not found',
      product: null,
    };
  }

  return {
    error: null,
    product: {
      createdAt: product.createdAt,
      createdBy: product.createdBy.toString(),
      id: product._id.toString(),
      imageURL: product.imageURL,
      sku: product.sku,
      title: product.title,
      updatedAt: product.updatedAt,
      updatedBy: product.updatedBy.toString(),
      version: product.version,
    },
  };
};

export const deleteProduct = async (sku: string): Promise<Product.ProductDeleteReply> => {
  const productExists = await Products.findOneAndUpdate(
    { isDeleted: false, sku },
    { isDeleted: true },
    { new: true }
  ).lean();

  if (!productExists) {
    return {
      error: 'Product not found',
    };
  }

  return {
    error: null,
  };
};
