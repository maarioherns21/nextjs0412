// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../../../../lib/db-connect"
import News from "../../../../models/post"
import User from '../../../../models/user';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      
    await connectMongo();

    const { id } = req.query
  ///----------we query the id from the post then we select what we want to fetch and then we populate it  with the user and pull what we need and execute
    const post = await News.findOne({ _id: id }).select('_id title slug image body user').populate("user").exec()
  
   
    if(post) {
        console.log(post)
        res.status(200).json(post)
    } else {
        res.status(401).json("something is not working")
    } 

     
    // if (!post.user) {
    //     console.log('No user found for post', post._id);
    //     return res.status(500).json({ message: 'User not found' });
    //   }
     
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