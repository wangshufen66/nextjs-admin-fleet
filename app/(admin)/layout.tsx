import Sidebar from '@/app/ui/dashboard/sidebar/sidebar';
// import styles from '@/app/ui/dashboard/dashboard.module.css';
import Footer from '@/app/ui/dashboard/footer/footer';
import Navbar from '@/app/ui/dashboard/navbar/navbar';

import { Suspense, ReactNode } from 'react';
import styles from '@/app/layout/layout.module.scss';
import Spinning from '@/app/components/Spinning';
import LayoutHeader from '@/app/layout/header';
import LayoutSide from '@/app/layout/sideBar';
import BreadCrumb from '@/app/layout/sideBar/bread';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Spinning />}>
        <div className={`flex-column ${styles.body}`}>
          <div className={styles.header}>
            <LayoutHeader />
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
      {/* <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </div> */}
    </>
  );
};

export default MainLayout;
