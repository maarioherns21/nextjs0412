// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../../../../lib/db-connect"
import News from "../../../../models/post"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      
    await connectMongo();

     const data = await News.find()
     
      res.status(200).json(data);
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }
  } catch (error: any) {
    console.log(error);

    res.status(404).json({ message: error.message });
  }
};

export default handler;