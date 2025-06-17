import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import connectDB from '@/db/connectDB'
import Userdata from '@/model/Userdata'

export const authoptions = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "facebook") {
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