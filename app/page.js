'use client';
import Header from './components/Header';
import TestimonialCard from './components/TestimonialCard';
import styles from './Landing.module.css';
import Footer from './components/footer'; 

const BulletIcon = () => (
  <span className={styles.bulletIcon}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#e53935"/><path d="M6 10.5l2.5 2.5L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </span>
);

export default function LandingPage() {
  return (
    <>
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroWelcome}>Welcome to</div>
        <div className={styles.herologo}>FinX</div>
        <p className={styles.heroSubtitle}>Plan. Analyze. Prosper.</p>
        <div className={styles.bulletsCard}>
          <div style={{ fontWeight: 500, fontSize: '1.15rem', marginBottom: '1.2rem', color: '#1a237e' }}>
            FinX empowers you to take control of your financial journey.
          </div>
          <ul>
            <li><BulletIcon />Track your income and spending automatically.</li>
            <li><BulletIcon />Build smarter budgets and investment plans with powerful analytics.</li>
            <li><BulletIcon />Get personalized insights to maximize your savings and minimize taxes.</li>
          </ul>
        </div>
        <p className={styles.heroSubtitle} style={{ fontWeight: 500, fontSize: '1.1rem', marginTop: '2rem' }}>
          Unlock clarity, take charge, and thrive with FinX—your companion for confident financial decisions.
        </p>
        <button className={styles.ctaButton} onClick={() => window.location.href='/login'}>
          Get Started
        </button>
      </section>
      <section className={styles.testimonialsSection}>
        <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
        <div className={styles.testimonialsGrid}>
          <TestimonialCard
            name="Amit Sharma"
            text="FinX made my tax filing so easy! The comparison feature is a game changer."
            avatar="https://randomuser.me/api/portraits/men/32.jpg"
          />
          <TestimonialCard
            name="Priya Verma"
            text="I love how simple and clear the interface is. Highly recommended for anyone!"
            avatar="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <TestimonialCard
            name="Rahul Singh"
            text="I saved money by choosing the right regime, thanks to FinX!"
            avatar="https://randomuser.me/api/portraits/men/65.jpg"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
