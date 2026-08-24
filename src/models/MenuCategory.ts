import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMenuCategory extends Document {
  name: string;
  slug: string;
  description?: string;

  sortOrder: number;
  isActive: boolean;
}

const MenuCategorySchema = new Schema<IMenuCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const MenuCategory: Model<IMenuCategory> =
  mongoose.models.MenuCategory ||
  mongoose.model<IMenuCategory>("MenuCategory", MenuCategorySchema);

export default MenuCategory;
