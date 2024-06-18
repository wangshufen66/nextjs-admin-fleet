import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import bcrypt from 'bcrypt';
import { getUser } from '@/lib/models/users';
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, request): Promise<any | null> {
        // console.log('52222 credentials: ', credentials);
        // console.log(
        //   'z.string().email(): ',
        //   z.string().email(),
        //   z.string().min(6)
        // );
        // const parsedCredentials = z
        //   .object({ email: z.string().email(), password: z.string().min(6) })
        //   .safeParse(credentials);

        // console.log('51222 parsedCredentials: ', parsedCredentials);
        // if (parsedCredentials.success) {
        const { Email, password } = credentials;
        // console.log('wwww email, password : ', Email, password);
        const user = await getUser(Email as string);
        if (!user) return null;
        let passwordsMatch;
        if (user.password) {
          // passwordsMatch = await bcrypt.compare(password, user.password);
          passwordsMatch = password == user.password;
        }
        // console.log('passwordsMatch: ', passwordsMatch);
        if (passwordsMatch) return user;
        // }
        // return null;
      }
    })
  ]
});
