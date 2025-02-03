import { db } from "../../../../src/utils/firebase"; // Importando a configuração do Firebase
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    // A coleção que você está tentando acessar no Firestore (garanta que o nome está correto)
    const auctionItemsRef = collection(db, "auctions"); // ou "auctionItems"
    const querySnapshot = await getDocs(auctionItemsRef);

    // Armazenando os itens em um array
    const auctionItems = [];
    querySnapshot.forEach((doc) => {
      auctionItems.push({
        id: doc.id, // Pega o ID do documento
        ...doc.data() // Pega os dados do documento
      });
    });

    // Retorna os itens para o cliente
    return new Response(JSON.stringify(auctionItems), { status: 200 });
  } catch (error) {
    console.error("Erro ao carregar os itens do leilão", error);
    return new Response("Erro ao carregar itens", { status: 500 });
  }
}
