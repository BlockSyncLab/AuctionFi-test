// app/api/auction/[itemId]/route.js
const auctionItems = [
    {
      id: 1,
      image: "/solana.jpg",
      highestBid: 100,
      winner: "Ninguém",
      timeLeft: 30,
      bids: [
        { user: "Usuário 1", amount: 100, time: "10s" },
        { user: "Usuário 2", amount: 110, time: "20s" },
        // mais lances
      ]
    },
    {
      id: 2,
      image: "/item2.jpg",
      highestBid: 150,
      winner: "Ninguém",
      timeLeft: 30,
      bids: [
        { user: "Usuário 1", amount: 150, time: "15s" },
        { user: "Usuário 2", amount: 160, time: "25s" },
        // mais lances
      ]
    },
    // outros itens
  ];
  
  export async function GET({ params }) {
    const { itemId } = params;
    
    // Buscando o item pelo ID
    const item = auctionItems.find((item) => item.id == itemId);
    if (!item) {
      return new Response("Item não encontrado", { status: 404 });
    }
  
    // Retorna o item com os lances
    return new Response(JSON.stringify({ item, bids: item.bids }), { status: 200 });
  }
  