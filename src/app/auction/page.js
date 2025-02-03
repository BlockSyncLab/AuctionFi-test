"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Login from "../../../components/Login";
import styles from "../../../styles/Auction.module.css";
import { useRouter } from "next/navigation";
import { db, auth } from "../../../src/utils/firebase"; // Firebase importado
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore"; // Importando funções do Firestore

export default function Auction() {
  const [auctionItems, setAuctionItems] = useState([]);
  const [user, setUser] = useState(null); // Usuário autenticado
  const router = useRouter();

  // Obter os itens do leilão da API ou Firestore
  useEffect(() => {
    const fetchAuctionItems = async () => {
      const auctionItemsRef = collection(db, "auctions"); // Referência para a coleção
      const querySnapshot = await getDocs(auctionItemsRef);
      
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id }); // Adiciona id de cada documento
      });
      setAuctionItems(items);
    };

    fetchAuctionItems();
  }, []);

  // Checa se o usuário está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Função para redirecionar para os detalhes do item
  const handleItemClick = (itemId) => {
    router.push(`/auction/${itemId}`); // Direciona para a página do item
  };

  // Função para dar lance
  const handleBid = async (itemId, currentBid) => {
    if (!user) {
      alert("Você precisa estar logado para dar um lance.");
      return;
    }

    // Atualiza o item de leilão com o novo maior lance
    const auctionRef = doc(db, "auctions", itemId); // Referência para o item
    const newBid = currentBid + 10; // Lances aumentam de 10 em 10 (exemplo)

    try {
      await updateDoc(auctionRef, {
        highestBid: newBid,
        winner: user.displayName, // O nome do usuário que deu o lance
        timeLeft: 30, // Reseta o tempo do leilão para 30 segundos
      });

      // Atualiza localmente os itens de leilão
      setAuctionItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, highestBid: newBid, winner: user.displayName, timeLeft: 30 } : item
        )
      );

      alert(`Lance de $${newBid} feito com sucesso!`);
    } catch (error) {
      console.error("Erro ao dar lance:", error);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <h1>Leilão</h1>
        <Login setUser={setUser} /> {/* Login do usuário */}
        <div className={styles.auctionContainer}>
          {auctionItems.map((item) => (
            <div
              key={item.id}
              className={styles.itemContainer}
              onClick={() => handleItemClick(item.id)}
            >
              <img src={item.image} alt={`Item ${item.id}`} className={styles.itemImage} />
              <div className={styles.auctionDetails}>
                <p><strong>Maior Lance:</strong> ${item.highestBid}</p>
                <p><strong>Nome do Vencedor:</strong> {item.winner}</p>
                <p><strong>Tempo Restante:</strong> {item.timeLeft}s</p>
              </div>
              <button
                className={styles.bidButton}
                onClick={() => handleBid(item.id, item.highestBid)}
              >
                Dar Lance
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}


