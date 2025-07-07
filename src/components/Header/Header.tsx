import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles['header']}>
      <h1 className={styles['header__name']}>Odin CV-App</h1>
    </header>
  );
}
