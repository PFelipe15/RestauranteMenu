"use client";
import Image, { StaticImageData } from "next/image";
import { FaMapMarkerAlt, FaMobileAlt, FaMoneyBillAlt } from "react-icons/fa";
import Logo from "./assets/logo.png";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaCaretDown,
  FaCaretUp,
  FaShoppingCart,
} from "react-icons/fa";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useState, useEffect } from "react";
import { pratosData } from "./data/services";
import Header from "./components/Header/Header";
import OptionModal from "./components/OptionModal/OptionModal";

export default function Home() {
  const [itsDown, setItsDown] = useState(false);
  const [showIgredients, setShowIgredients] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("pix");



const chamaToastify = (msg:string, color:string)=>{
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
}



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

 
  const handleAddToCart = (product: { nome: string }): void => {
    setCart([...cart, product]);
    chamaToastify(`${product.nome} Adicionado ao Carrinho`,"linear-gradient(to right, #362219, green)")
 
  };

  const handleRemoveFromCart = (product: any) => {
    const updatedCart = cart.filter((item) => item.nome !== product.nome);
    setCart(updatedCart);
  };

  const handleToggleIngredientes = () => {
    setShowIgredients(!showIgredients);
    setItsDown(!showIgredients);
  };

  const sendMessage = () => {
    openModal();
  };
 
 

  
  return (
    <main className="flex min-h-screen flex-col items-center">
    
<Header/>
      <section className="flex flex-col container p-4">
        <h1 className="text-3xl font-semibold mb-4 py-2 mr-4 border-b-2  border-primaryColor">
          Deliciosos Pratos Típicos
        </h1>

        <div className="flex flex-wrap gap-5">
          {pratosData.map((produto, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-2 border-amber-950 flex flex-col"
            >
              <div className="flex items-center justify-center">
                <Image
                  alt="produto imagem"
                  src={Logo}
                  width={420}
                  height={200}
                />
              </div>
              <h2 className="text-lg font-semibold mt-2">{produto.nome}</h2>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">Ingredientes:</h3>
                  <button
                    onClick={() => {
                      handleToggleIngredientes();
                    }}
                    className="text-primaryColor hover:underline focus:outline-none"
                  >
                    {showIgredients ? <FaCaretUp /> : <FaCaretDown />}
                  </button>
                </div>
                {showIgredients && (
                  <ul className="list-disc pl-5 mt-2">
                    {produto.ingredientes.map((ingrediente, i) => (
                      <li
                        key={i}
                        className="transition duration-300 text-sm ease-in-out hover:bg-gray-100 hover:text-gray-700"
                      >
                        {ingrediente}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold text-primaryColor">
                  R$ {produto.preco.toFixed(2)}
                </p>
                <button
                  onClick={() => {
                    handleAddToCart(produto);
                  }}
                  className="bg-primaryColor text-white px-4 py-2 rounded-md"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="bg-primaryColor text-white right-6 top-40 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 fixed"
      >
        <FaShoppingCart size={24} />
      </button>

      <div
        className={`fixed right-0 top-0 w-72 bg-white p-4 border-2 border-amber-950 rounded-l-lg shadow-md transition-all duration-300 max-h-screen overflow-y-auto ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Carrinho de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-lg text-primaryColor">
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
            <span className="text-lg font-semibold text-primaryColor">
              R${" "}
              {cart.reduce((acc, product) => acc + product.preco, 0).toFixed(2)}
            </span>
          </div>

          {/* New Section: Método de Pagamento */}
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
      </div>

      {showModal && (
        <OptionModal closeModal={closeModal}  />      
      )}
    </main>
  );
}
