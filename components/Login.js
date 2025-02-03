"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../src/utils/firebase"; // Configuração do Firebase
import { doc, setDoc } from "firebase/firestore";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Campo adicional para o nome
  const [user, setLocalUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false); // Estado para alternar entre Login e Signup

  // Função para registrar o usuário no Firestore
  const createUserInFirestore = async (uid, email, name) => {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        id: uid,
        email,
        name,
        lanceCount: 0, // Saldo inicial de lances
      });
      console.log("Usuário registrado no Firestore.");
    } catch (error) {
      console.error("Erro ao registrar usuário no Firestore:", error);
    }
  };

  // Registro de novo usuário
  const handleRegister = async () => {
    try {
      // Cria o usuário no Firebase Authentication
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Salva o usuário no Firestore
      await createUserInFirestore(user.uid, email, name);

      setUser(user.email); // Passa o email do usuário autenticado ao componente pai
      setLocalUser(user.email);
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert(`Erro ao criar conta: ${error.message}`);
    }
  };

  // Login de usuário existente
  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      setUser(user.email); // Passa o email do usuário autenticado ao componente pai
      setLocalUser(user.email);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert(`Erro ao fazer login: ${error.message}`);
    }
  };

  // Logout do usuário
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reseta o usuário no componente pai
      setLocalUser(null);
      alert("Logout realizado com sucesso!");
    } catch (error) {
      alert(`Erro ao fazer logout: ${error.message}`);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Bem-vindo, {user}</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>
          {isSignup ? (
            // Tela de cadastro
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Criar Conta</button>
              <p>
                Já tem uma conta?{" "}
                <button onClick={() => setIsSignup(false)}>Faça login aqui</button>
              </p>
            </div>
          ) : (
            // Tela de login
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <p>
                Não tem uma conta?{" "}
                <button onClick={() => setIsSignup(true)}>Crie uma aqui</button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


