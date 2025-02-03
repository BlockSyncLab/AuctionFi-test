// app/auction/[itemId]/page.js

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Substitui useRouter
import { db } from "../../../../src/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuctionItemPage = () => {
  const { itemId } = useParams(); // Obtém o itemId diretamente
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!itemId) return;

    // Busca o item do Firestore
    const fetchItem = async () => {
      try {
        const itemDocRef = doc(db, "auctions", itemId);
        const docSnap = await getDoc(itemDocRef);

        if (docSnap.exists()) {
          setItem(docSnap.data());
        } else {
          console.log("Item não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!item) {
    return <p>Item não encontrado.</p>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} />
      <p><strong>Maior Lance:</strong> ${item.highestBid}</p>
      <p><strong>Vencedor:</strong> {item.winner}</p>
      <p><strong>Tempo Restante:</strong> {item.timeLeft}s</p>
      <button onClick={() => alert("Função de dar lance ainda não implementada.")}>
        Dar Lance
      </button>
    </div>
  );
};

export default AuctionItemPage;

