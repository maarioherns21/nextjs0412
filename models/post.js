import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
    },
    user: {
      type: String
     
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.models.News || mongoose.model("News", PostSchema);

export default News;
