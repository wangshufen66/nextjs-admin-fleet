// import { deleteUser } from '@/app/lib/actions';
// import { fetchUsers } from '@/app/lib/data';
import { getUsers } from '@/lib/db';

import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/users/users.module.css';
import Image from 'next/image';
import Link from 'next/link';
import UserTable from './UserTable';

const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  const q = searchParams?.q || '';
  const { count, users } = await getUsers(q);
  console.log('count, users: ', count, users);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <UserTable dataSource={users}></UserTable>
    </div>
  );
};
export default UsersPage;
