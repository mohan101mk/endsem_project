import Navbar from '../components/navbar';
import Footer from '../components/footer';
import styles from './layout.module.css';

export default function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}