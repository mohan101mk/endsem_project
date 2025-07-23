import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>FinX</div>
    <nav className={styles.nav}>
      <Link href="/login" className={styles.button}>Login</Link>
      <Link href="/signup" className={styles.button}>Signup</Link>
    </nav>
  </header>
);

export default Header; 