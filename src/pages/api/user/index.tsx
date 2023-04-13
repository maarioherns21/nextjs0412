import { NextApiRequest, NextApiResponse } from "next"
import User from "../../../../models/user"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
        
      const data = await User.find();

      res.status(200).json(data);
    } else {
      res.status(500).json({ message: "Request not accepeted" });
    }
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export default handler