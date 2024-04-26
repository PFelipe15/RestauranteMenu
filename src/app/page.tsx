"use client";
import { FaMapMarkerAlt, FaMobileAlt, FaMoneyBillAlt } from "react-icons/fa";
import Logo from "./assets/Roupas/IMG-20210222-WA0332.jpg";

import { FaShoppingCart } from "react-icons/fa";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useState, useEffect } from "react";
import roupasData from "./data/services";
import Header from "./components/Header/Header";
import OptionModal from "./components/OptionModal/OptionModal";
import Image from "next/image";
import Carrinho from "./components/Carrinho/Carrinho";

export default function Home() {
  const [itsDown, setItsDown] = useState(false);
   const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const chamaToastify = (msg: string, color: string) => {
    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      style: {
        background: color,
      },
    }).showToast();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = (product: { nome: string }): void => {
    setCart([...cart, product]);
    chamaToastify(`${product.nome} Adicionado ao Carrinho`, "primary");
  };

  const sendMessage = () => {
    openModal();
  };


  const groupByCategory = () => {
    const groupedRoupas: { [key: string]: any[] } = {};
    roupasData.forEach((produto) => {
      if (!groupedRoupas[produto.categoria]) {
        groupedRoupas[produto.categoria] = [];
      }
      groupedRoupas[produto.categoria].push(produto);
    });
    return groupedRoupas;
  };

  const renderRoupasByCategory = () => {
    const groupedRoupas = groupByCategory();
    return Object.entries(groupedRoupas).map(([categoria, roupas], index) => (
      <section key={index} className="flex flex-col container p-4">
        <h1 className="text-3xl font-semibold mb-4 py-2 mr-4 border-b-2 border-primary">
          {categoria}
        </h1>
        <div className="flex flex-wrap gap-5">
          {roupas.map((produto, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-md border-2 border-primary flex flex-col justify-between"
            >
              <div className="flex items-center justify-center">
                <Image src={Logo} alt="produto imagem" className="h-64 w-64" />
              </div>
              <h2 className="text-2xl font-semibold mt-2 w-60">
                {produto.nome}
              </h2>
              <p className="mt-2 w-64">{produto.descricao}</p>{" "}
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold text-primary">
                  R$ {produto.preco.toFixed(2)}
                </p>
                <button
                  onClick={() => {
                    handleAddToCart(produto);
                  }}
                  className="bg-primary text-secondary font-bold px-4 py-2 rounded-md"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    ));
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      {renderRoupasByCategory()}

      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="bg-primary text-white right-6 top-40 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 fixed"
      >
        <FaShoppingCart size={24} />
      </button>

<Carrinho isCartOpen={isCartOpen} closeModal={closeModal} setIsCartOpen={setIsCartOpen} sendMessage={sendMessage} openModal={openModal} />

      {/* <div
        className={`fixed right-0 top-0 w-72 h-full bg-white p-4 border-2 border-amber-950 rounded-l-lg shadow-md transition-all duration-300 max-h-screen overflow-y-auto ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Carrinho de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-lg text-primary">
            Seu carrinho está vazio. 😢
          </p>
        ) : (
          <ul className="space-y-4">
            {cart.map((product, index) => (
              <li
                key={index}
                className="flex items-between justify-between border-b-2"
              >
                <span>
                  {product.nome} - R$ {product.preco.toFixed(2)}
                </span>
                <button
                  onClick={() => handleRemoveFromCart(product)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-col gap-5 justify-between">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold text-primary">
              R${" "}
              {cart.reduce((acc, product) => acc + product.preco, 0).toFixed(2)}
            </span>
          </div>

           <div>
            <h3 className="text-md font-semibold mb-2">Método de Pagamento:</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="pix"
                  checked={paymentMethod === "pix"}
                  onChange={() => setPaymentMethod("pix")}
                  className="mr-2"
                />
                PIX
                <FaMobileAlt size={20} className="ml-1" />
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="especie"
                  checked={paymentMethod === "especie"}
                  onChange={() => setPaymentMethod("especie")}
                  className="mr-2"
                />
                Espécie
                <FaMoneyBillAlt size={20} className="ml-1" />
              </label>
            </div>
          </div>

          <div className="flex gap-4 flex-col ">
            <button
              onClick={() => setIsCartOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                sendMessage();
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div> */}

      {showModal && <OptionModal closeModal={closeModal} />}
    </main>
  );
}
