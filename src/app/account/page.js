"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import styles from "../../../styles/Auction.module.css";
import { auth, db } from "../../../src/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Para redirecionamento

export default function Account() {
  const [user, setUser] = useState(null);
  const [lancePack, setLancePack] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Hook de redirecionamento

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);

        try {
          // Busca o documento do usuário no Firestore
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setLancePack(userData.lanceCount || 0); // Atualiza o saldo de lances
          } else {
            console.error("Usuário não encontrado no Firestore.");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Função para redirecionar para a página de login
  const handleLoginRedirect = () => {
    router.push("/login"); // Redireciona para a página de login
  };

  // Função para redirecionar para a página de cadastro (caso você tenha)
  const handleSignupRedirect = () => {
    router.push("/signup"); // Redireciona para a página de signup
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className={styles.main}>
        {loading ? (
          <p>Carregando...</p>
        ) : user ? (
          <div>
            <h1>Minha Conta</h1>
            <p>Usuário: {user.displayName || user.email || "Nome não disponível"}</p>
            <p>Saldo de Lances: {lancePack}</p>
            <a href="/auction/packages">Comprar Pacotes de Lances</a>
          </div>
        ) : (
          <div>
            <p>Você não está logado. Faça login para acessar sua conta.</p>
            {/* Botão de redirecionamento para login */}
            <button onClick={handleLoginRedirect}>Ir para Login</button>
            {/* Caso queira fornecer a opção de criar uma conta */}
            <p>Ainda não tem uma conta? <button onClick={handleSignupRedirect}>Crie uma aqui</button></p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}




