import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/user"
import connectMongo from "../../../../lib/db-connect"
import bcrypt from "bcrypt"

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.CLIENT_ID_GIT,
      clientSecret: process.env.CLIENT_SECRET_GIT,
    }),
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        const { email, password } = credentials;

        await connectMongo().catch((error) => {
         console.log(error.message);
        });

        // check user existance
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        // compare()
        const checkPassword = await bcrypt.compare(password, user.password);

        // incorrect password
        if (!checkPassword || user.email !== email) {
          throw new Error("Username or Password doesn't match");
        }
         console.log(user)
        return user;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {

    //   // await connectToDatabase();

    //   // // Check if the user already exists in the database
    //   // const existingUser = await User.findOne({ email: user.email });
      
    //   // if (existingUser) {
    //   //   // Update the user's information if necessary
    //   //   return true;
    //   // }

    //   // // Create a new user in the database
    //   // const newUser = new User({
    //   //   name: user.name,
    //   //   email: user.email,
    //   //   image: user.image,
    //   //   user : user.id,
    //   // });

    //   // await newUser.save();

    //   return true
    // },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub;

      return {session};
    },
  },
};



export default NextAuth(authOptions);