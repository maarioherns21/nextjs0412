import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../../models/user";
import connectMongo from "../../../../../lib/db-connect";
import bcrypt from "bcrypt"
const saltRounds = 10;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { email, password, name } = req.body;
       //mongo db connection 
      await connectMongo();
      
      //this will generate a random password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      const oldUser = await User.findOne({ email });

      if (oldUser) return res.status(400).json({ message: "User Already exist" });

      const newUser = new User({ email, password: hashPassword, name });

      const data = await newUser.save();

      res.status(200).json({user: data});
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }
    // res.status(200).json(data);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default handler