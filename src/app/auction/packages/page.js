"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import styles from "../../../../styles/Packages.module.css";
import { db, auth } from "../../../../src/utils/firebase"; // Configuração do Firebase
import { doc, setDoc, updateDoc, increment } from "firebase/firestore";

export default function Packages() {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário atual
  const router = useRouter();

  // Checa se o usuário está logado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Lógica para lidar com a compra de lances
  const handlePurchase = async (packSize) => {
    if (!user) {
      alert("Você precisa estar logado para comprar pacotes.");
      router.push("/login"); // Redireciona para a página de login
      return;
    }

    try {
      await registerPackage(user.uid, packSize);
      alert(`Você comprou um pacote de ${packSize} lances!`);
    } catch (error) {
      console.error("Erro ao processar compra:", error);
    }
  };

  // Registra o pacote comprado e atualiza os lances do usuário
  const registerPackage = async (userId, packageSize) => {
    try {
      // Cria um documento para o pacote comprado
      const packageRef = doc(db, "packages", `${userId}-${Date.now()}`);
      await setDoc(packageRef, {
        userId,
        packageSize,
        purchaseDate: new Date().toISOString(),
      });

      // Atualiza o saldo de lances do usuário
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        lanceCount: increment(packageSize),
      });

      console.log(`Pacote de ${packageSize} lances registrado!`);
    } catch (error) {
      console.error("Erro ao registrar pacote:", error);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <h1>Comprar Pacotes de Lances</h1>
        <div className={styles.grid}>
          <div className={styles.packageCard}>
            <img src="/alphabid.jpg" alt="10 Lances" className={styles.packageImage} />
            <button onClick={() => handlePurchase(10)} className={styles.packageButton}>10 Lances</button>
          </div>
          <div className={styles.packageCard}>
            <img src="/alphabid.jpg" alt="20 Lances" className={styles.packageImage} />
            <button onClick={() => handlePurchase(20)} className={styles.packageButton}>20 Lances</button>
          </div>
          <div className={styles.packageCard}>
            <img src="/alphabid.jpg" alt="30 Lances" className={styles.packageImage} />
            <button onClick={() => handlePurchase(30)} className={styles.packageButton}>30 Lances</button>
          </div>
          <div className={styles.packageCard}>
            <img src="/alphabid.jpg" alt="50 Lances" className={styles.packageImage} />
            <button onClick={() => handlePurchase(50)} className={styles.packageButton}>50 Lances</button>
          </div>
          <div className={styles.packageCard}>
            <img src="/alphabid.jpg" alt="100 Lances" className={styles.packageImage} />
            <button onClick={() => handlePurchase(100)} className={styles.packageButton}>100 Lances</button>
          </div>
          <div className={styles.packageCard}>
            <img src="/alphabid.jpg" alt="200 Lances" className={styles.packageImage} />
            <button onClick={() => handlePurchase(200)} className={styles.packageButton}>200 Lances</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

