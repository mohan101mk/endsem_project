import styles from './footer.module.css';

const socialLinks = [
  { href: 'https://youtube.com', label: 'YouTube', icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1a237e" d="M23.498 6.186a2.998 2.998 0 0 0-2.11-2.12C19.37 3.5 12 3.5 12 3.5s-7.37 0-9.388.566a2.998 2.998 0 0 0-2.11 2.12A31.13 31.13 0 0 0 0 12a31.13 31.13 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.11 2.12C4.63 20.5 12 20.5 12 20.5s7.37 0 9.388-.566a2.998 2.998 0 0 0 2.11-2.12A31.13 31.13 0 0 0 24 12a31.13 31.13 0 0 0-.502-5.814ZM9.75 16.02V7.98l7.5 4.02-7.5 4.02Z"/></svg>
  )},
  { href: 'https://twitter.com', label: 'X', icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1a237e" d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94 7.53 6.47A.75.75 0 1 0 6.47 7.53L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 1 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06Z"/></svg>
  )},
  { href: 'https://instagram.com', label: 'Instagram', icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" fill="#1a237e"/><circle cx="12" cy="12" r="4" fill="#fff"/><circle cx="17" cy="7" r="1" fill="#fff"/></svg>
  )},
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1a237e"/><rect x="5" y="8" width="3" height="11" fill="#fff"/><rect x="10.5" y="11" width="3" height="8" fill="#fff"/><circle cx="6.5" cy="6.5" r="1.5" fill="#fff"/><rect x="16" y="11" width="3" height="5" fill="#fff"/></svg>
  )},
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <div className={styles.brand}>FinX</div>
          <div className={styles.tagline}>Plan. Analyze. Prosper.</div>
          <div className={styles.socials}>
            {socialLinks.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.legalTitle}>Legal</div>
          <ul className={styles.legalLinks}>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Community Guidelines</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div>© 2025 FinX. All rights reserved.</div>
        <div className={styles.madeFor}>Made for finance enthusiasts worldwide</div>
      </div>
    </footer>
  );
}
