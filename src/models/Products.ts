import { model, PaginateModel, Schema, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema<Model.Product>(
  {
    createdBy: {
      required: true,
      type: Types.ObjectId,
    },
    deletedAt: {
      default: null,
      type: Date,
    },
    deletedBy: {
      default: null,
      type: Types.ObjectId,
    },
    imageURL: {
      default: null,
      type: String,
    },
    isDeleted: {
      default: false,
      type: Boolean,
    },
    sku: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    updatedBy: {
      required: true,
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: 'version',
  }
);

ProductSchema.pre('save', function (next) {
  this.increment();
  return next();
});

ProductSchema.pre('findOneAndUpdate', function (next) {
  if (this.getUpdate()) {
    this.update({}, { $inc: { version: 1 } }, next);
  }
  next();
});

ProductSchema.plugin(paginate);

const ProductModel = model<Model.Product, PaginateModel<Model.Product>>('products', ProductSchema);

export default ProductModel;
