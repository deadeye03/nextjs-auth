
import NextAuth from "next-auth";

import User from "@/models/User";
import { connectDB } from "@/db/connectDB";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const userFound = await User.findOne({
          email: credentials.email,
        }).select("+password");

        if (!userFound) throw new Error("Invalid Email or Password");

        const passwordMatch = await bcrypt.compare(credentials.password, userFound.password
        );

        if (!passwordMatch) throw new Error("Invalid Email or Password");
        return userFound;
      },
    })

  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {/**
 * Authorizes a user based on provided credentials.
 *
 * @param {Object} credentials - The user's credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Object} The authenticated user object.
 * @throws {Error} If the email or password is invalid.
 */
async authorize(credentials) {
  // Establish a connection to the database
  await connectDB();

  // Find the user in the database by email and include the password field
  const userFound = await User.findOne({
    email: credentials.email,
  }).select("+password");

  // If no user is found, throw an error indicating invalid email or password
  if (!userFound) throw new Error("Invalid Email or Password");

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);

  // If the passwords do not match, throw an error indicating invalid email or password
  if (!passwordMatch) throw new Error("Invalid Email or Password");

  // Return the authenticated user object
  return userFound;
},
    async signIn({ user, account, profile }) {

      await connectDB();
      let currentUser = await User.findOne({ email: user.email })
      if (!currentUser) {
        await User.create({ name: user.name, email: user.email, photo: user.image })
      }

      return true // Do different verification for other providers that don't have `email_verified`
    },
    async signOut() {
      return true
    },
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        const u = user;
        const tokens = {
          ...token,
          id: u.id,
        }
        // console.log("tokens is",tokens)
      }
      return token
    },
    async session({ session, token, user }) {

      console.log('i am cookies')
     
      const currentUser = await User.findOne({ email: session.user.email })
      return {
        ...session,
        currentUser,
        token

      }
    }
  },
  secret: process.env.JWT_SECRET
})

export { handler as GET, handler as POST }