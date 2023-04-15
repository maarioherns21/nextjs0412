// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../../../../../lib/db-connect"
import News from "../../../../../models/post"
import multer from "multer"
import path from 'path'
import nc from "next-connect";
import slugify from 'slugify'
import mongoose from 'mongoose';





const staticURL = "http://localhost:3000/uploads/"

export const config = {
  api: {
    bodyParser: false,
  },
};

////----- multer for next.js -----//

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

////----- multer for next.js -----//


//next-connect--------------
const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).use(upload.single("image"));


///this is the handler you can use when adding for example multer
handler.post( async (req: NextApiRequest & { file: any }, res: NextApiResponse) => {
    try {
      await connectMongo();
      const post = req.body;
      const { file } = req;
       //this add the name of the image at the end of the post id
      const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });
      // console.log("slug :" , slug)
      // console.log({ file, ...post.user });

      /// i had to do the filename because that was the only way to save the file to the data base
      const newPost = new News({ ...post, image: file.filename, slug: slug.toLocaleLowerCase() });

      // console.log(newPost);

      const savePost = await newPost.save();

      res.status(201).json({ data: savePost });
    } catch (error: any) {
      console.log(error);

      res.status(404).json({ message: error.message });
    }
  }
);

export default handler;

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (req.method === "POST") {
//       const { title, body, image } = req.body;

//       await connectMongo();

//       const newPost = new News({ title, body, image });

//       const data = await newPost.save();

//       res.status(200).json(data);
//     } else {
//       res.status(500).json("This is not a GET Request");
//     }
//   } catch (error: any) {
//     console.log(error);

//     res.status(404).json({ message: error.message });
//   }
// };

// export default handler;