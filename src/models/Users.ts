import { model, Schema } from 'mongoose';

const UserSchema = new Schema<Model.User>(
  {
    accessTokens: [
      {
        accessToken: {
          required: true,
          type: String,
        },
        expiresIn: {
          required: true,
          type: Number,
        },
      },
    ],
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: 'version',
  }
);

UserSchema.pre('save', function (next) {
  this.increment();
  return next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  if (this.getUpdate()) {
    this.update({}, { $inc: { version: 1 } }, next);
  }
  next();
});

const UserModel = model<Model.User>('users', UserSchema);

export default UserModel;
