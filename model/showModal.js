import  { Schema, model } from "mongoose";


const ShowSchema = new Schema({
  id: Number,
  url: String,
  name: String,
  type: String,
  language: String,
  genres: [String],
  status: String,
  runtime: Number,
  averageRuntime: Number,
  premiered: Date,
  ended: Date,
  officialSite: String,
  schedule: {
    time: String,
    days: [String]
  },
  rating: {
    average: Number
  },
  weight: Number,
  network: {
    id: Number,
    name: String,
    country: {
      name: String,
      code: String,
      timezone: String
    },
    officialSite: String
  },
  webChannel: {
    type: Schema.Types.Mixed,
    default: null
  },
  dvdCountry: {
    type: Schema.Types.Mixed,
    default: null
  },
  externals: {
    tvrage: Number,
    thetvdb: Number,
    imdb: String
  },
  image: {
    medium: String,
    original: String
  },
  summary: String,
  updated: Number,
  _links: {
    self: {
      href: String
    },
    previousepisode: {
      href: String,
      name: String
    }
  }
});

export const showModal = model('Show', ShowSchema);
