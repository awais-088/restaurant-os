import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeal extends Document {
  title: string;
  description?: string;

  originalPrice?: number;
  dealPrice: number;

  image?: string;

  isActive: boolean;
  startDate?: Date;
  endDate?: Date;

  sortOrder: number;
}

const DealSchema = new Schema<IDeal>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    originalPrice: {
      type: Number,
      min: 0,
    },

    dealPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    startDate: Date,

    endDate: Date,

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Deal: Model<IDeal> =
  mongoose.models.Deal || mongoose.model<IDeal>("Deal", DealSchema);

export default Deal;
