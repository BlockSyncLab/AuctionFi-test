import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/auction">Auction</Link></li>
        <li><Link href="/nft">NFT</Link></li>
        <li><Link href="/mission">Mission</Link></li>
        <li><Link href="/auction/packages">Packages</Link></li>
        <li><Link href="/account">Account</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;