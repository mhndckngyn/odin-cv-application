import Form from './components/Form/Form';
import Header from './components/Header/Header';
import styles from './app.module.css';
import Preview from './components/Preview/Preview';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles['app__main']}>
        <Form />
        <Preview />
      </main>
    </div>
  );
}

export default App;
