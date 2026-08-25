import mongoose, { Schema, type Model } from "mongoose";

export type DealDocument = {
  title: string;
  description: string;
  price?: number;
  badge?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const DealSchema = new Schema<DealDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      min: 0,
    },

    badge: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Deal: Model<DealDocument> =
  mongoose.models.Deal || mongoose.model<DealDocument>("Deal", DealSchema);

export default Deal;
