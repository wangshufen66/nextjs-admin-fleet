import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';
import Image from 'next/image';

export async function User() {
  const session = await auth();
  // console.log('hhh session: ', session);
  const user = session?.user;

  if (!user) {
    return <Button variant="outline">未登录</Button>;
  }

  return (
    <div className="flex items-center gap-4">
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button variant="outline"> Sign Out1</Button>
      </form>
      <div>{user.name}</div>
      <Image
        className="h-8 w-8 rounded-full"
        src={user.image!}
        height={32}
        width={32}
        alt={`${user.name} avatar`}
      />
    </div>
  );
}
