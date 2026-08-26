import mongoose, { Schema, type Model } from "mongoose";

export type GalleryDocument = {
  title: string;
  description?: string;
  category: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const GallerySchema = new Schema<GalleryDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
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

const Gallery: Model<GalleryDocument> =
  mongoose.models.Gallery ||
  mongoose.model<GalleryDocument>("Gallery", GallerySchema);

export default Gallery;
