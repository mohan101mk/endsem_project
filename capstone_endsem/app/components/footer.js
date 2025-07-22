import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      
      <div className={styles.text}>
      © 2025 Budget Tracker — Made with ❤️ by MK
      </div>
      <div className={styles.links}>
        <a
          href="https://github.com/mohan101mk"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <span className={styles.separator}>|</span>
        <a
          href="https://www.linkedin.com/in/mohankumarcr"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          linkedin
        </a>
      </div>
    </footer>
  );
}
