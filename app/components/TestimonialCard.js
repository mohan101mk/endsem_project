import styles from './TestimonialCard.module.css';

const TestimonialCard = ({ name, text, avatar }) => (
  <div className={styles.card}>
    {avatar && <img src={avatar} alt={name} className={styles.avatar} />}
    <p className={styles.text}>&ldquo;{text}&rdquo;</p>
    <div className={styles.name}>- {name}</div>
  </div>
);

export default TestimonialCard; 