import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/db/connectDB'
import Userdata from '@/model/Userdata'

export const authoptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "google") {
        await connectDB()
        const currentUser = await Userdata.findOne({ email: user.email })
        if (!currentUser) {
          const newUser = await Userdata.create({
            email: user.email,
            name: user.name,
            cart: []
          })
        }
        else {
          await Userdata.updateOne({ SigninAt: currentUser.SigninAt }, { SigninAt: Date.now() })
        }
      }

      return true
    },
    
    async jwt({ token, account, profile }) {
      await connectDB()
      const currentUser = await Userdata.findOne({ email: token.email })
      if (currentUser) {
        token.id = currentUser._id
      }
      return token
    },

    async session({ session, user, token }) {
      session.user.userID = token.id
      return session
    }
  }
})

export { authoptions as GET, authoptions as POST }