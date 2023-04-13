import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "../../../../models/user"
import connectMongo from "../../../../lib/db-connect"
import bcrypt from "bcrypt"

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
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

        return user;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub;

      return {session};
    },
  },

};



export default NextAuth(authOptions);