import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOpeningHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface ISocialLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

export interface IRestaurant extends Document {
  name: string;
  slug: string;

  tagline?: string;
  description?: string;

  phone?: string;
  whatsapp?: string;
  email?: string;

  address?: string;
  city?: string;
  country?: string;

  logo?: string;
  coverImage?: string;

  googleMapsUrl?: string;

  openingHours: IOpeningHour[];

  socialLinks?: ISocialLinks;

  isActive: boolean;
}

const OpeningHourSchema = new Schema<IOpeningHour>(
  {
    day: {
      type: String,
      required: true,
    },

    open: {
      type: String,
      default: "",
    },

    close: {
      type: String,
      default: "",
    },

    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    facebook: String,
    instagram: String,
    tiktok: String,
    youtube: String,
  },
  {
    _id: false,
  },
);

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    tagline: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    whatsapp: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },

    coverImage: {
      type: String,
      trim: true,
    },

    googleMapsUrl: {
      type: String,
      trim: true,
    },

    openingHours: {
      type: [OpeningHourSchema],
      default: [],
    },

    socialLinks: {
      type: SocialLinksSchema,
      default: {},
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

const Restaurant: Model<IRestaurant> =
  mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
