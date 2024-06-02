import { Suspense, ReactNode } from 'react';
import styles from '@/app/layout/layout.module.scss';
import Spinning from '@/app/components/Spinning';
import { User } from '@/app/layout/header/user';
import LayoutSide from '@/app/layout/sideBar';
import BreadCrumb from '@/app/layout/sideBar/bread';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Spinning />}>
        <div className={`flex-column ${styles.body}`}>
          <div className={styles.header}>
            {/* <LayoutHeader /> */}
            <User />
          </div>
          <div className={`flex-row ${styles.main}`}>
            <div className={styles.side}>
              <LayoutSide />
            </div>
            <div className={`flex-column ${styles.content}`}>
              <BreadCrumb />
              <div className={styles.wrapper}>{children}</div>
              <p className={styles.footer}>2023 @小红书11</p>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default MainLayout;
