import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../../models/user";
import connectMongo from "../../../../../lib/db-connect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Request not Aceepted" });
  }

  try {
    const { email, password, name } = req.body;

    await connectMongo();

    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User Already exist" });

    const newUser = new User({ email, password, name });

    const data = await newUser.save();

    res.status(200).json(data);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default handler