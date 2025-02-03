import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <h1>Bem-vindo ao AuctionFi</h1>
        <p>O melhor site para você realizar lances online!</p>
      </main>
      <Footer />
      
    </div>
    
  );
}