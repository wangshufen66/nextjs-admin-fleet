import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq, ilike } from 'drizzle-orm';

export const db = drizzle(
  neon(process.env.POSTGRES_URL!, {
    fetchOptions: {
      cache: 'no-store'
    }
  })
);

const users = pgTable('users', {
  id: varchar('id', { length: 20 }).primaryKey(),
  name: varchar('name', { length: 50 }),
  username: varchar('username', { length: 50 }),
  email: varchar('email', { length: 50 }),
  password: varchar('password', { length: 50 }),
  image: varchar('image', { length: 255 })
});

export type SelectUser = typeof users.$inferSelect;

export async function getUsers(search: string): Promise<{
  users: SelectUser[];
  count?: number;
}> {
  // Always search the full table, not per page
  if (search) {
    console.log('---search: ', search);
    const searchusers = await db
      .select()
      .from(users)
      .where(ilike(users.name, `%${search}%`));
    return {
      users: searchusers,
      count: searchusers.length
    };
  }

  const moreUsers = await db.select().from(users);
  return { users: moreUsers, count: moreUsers.length };
}

export async function getUser(email: string) {
  const res = await db.select().from(users).where(eq(users.email, email));
  return res[0];
}

export async function deleteUserById(id: number) {
  await db.delete(users).where(eq(users.id, id));
}
