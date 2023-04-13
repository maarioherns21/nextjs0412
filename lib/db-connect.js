//available in browers 
// likr windows we have a gloabl variable in node env

import mongoose from "mongoose";



global.mongoose = {
  conn: null,
  promise: null,
};


const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.CLIENT_MONGO_URL);

        if(connection.readyState == 1){
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectMongo;