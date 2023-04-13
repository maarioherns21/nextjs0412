import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../../models/user";
import connectMongo from "../../../../../lib/db-connect";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      
      await connectMongo();

      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.json({ message: "Credentials not valid" });

      res.status(200).json(user);
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};


export default handler