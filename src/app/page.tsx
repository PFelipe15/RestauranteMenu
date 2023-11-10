"use client";
import Image, { StaticImageData } from "next/image";
import Logo from "./assets/logo.png";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { pratosData } from "./data/services";
import { Transition } from "react-transition-group";
import { FaShoppingCart } from "react-icons/fa";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Home() {
  const [itsDown, setItsDown] = useState(false);
  const [showIgredients, setShowIgredients] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pratos, setPratos] = useState([]);
  const handleAddToCart = (product: []): void => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.nome !== product.nome);
    setCart(updatedCart);
  };
  const handleToggleIngredientes = (index) => {
    setShowIgredients(!showIgredients);

    setItsDown(!showIgredients);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="bg-primaryColor p-4 shadow-md w-full">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image alt="logo" src={Logo} width={60} height={60} />
            <div className="text-white">
              <h1 className="text-xl font-semibold">Restaurante Flutuante</h1>
              <p className="text-xs">Servico especializado em Pratos Tipicos</p>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center gap-2">
            <div className="text-white flex items-center space-x-4">
              <a href="#" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
            </div>
            <button
              onClick={() => {
                const link = `https://api.whatsapp.com/send?phone= &text=Olá, estou querendo solicitar um Orcamento!`;

                const newTab = window.open(link, "_blank");
                if (newTab) {
                  newTab.focus();
                } else {
                  window.location.href = link;
                }
              }}
              className="bg-green-700 w-full text-sm text-white gap-1 flex rounded-md px-2 py-2 items-center justify-center "
            >
              WhatsApp
              <FaWhatsapp size={25} />
            </button>

            <button
              onClick={() => {
                const link = `https://maps.app.goo.gl/x1X8wZQwiSbkDkHJ9`;

                const newTab = window.open(link, "_blank");
                if (newTab) {
                  newTab.focus();
                } else {
                  window.location.href = link;
                }
              }}
              className="bg-white text-sm text-red-primaryColor gap-1 flex rounded-md px-2  py-2 items-center justify-center "
            >
              Localização
              <FaMapMarkerAlt size={25} />
            </button>
          </div>
        </div>
      </header>

      <section className="flex flex-col container  p-4  ">
        <h1 className="text-2xl font-semibold mb-4 py-2 mr-4 border-b-2  border-primaryColor  ">
          Pratos
        </h1>

        <div className="flex  flex-wrap gap-5 ">
          {pratosData.map((produto, index) => (
            <div
              key={index}
              className="bg-white p-4  rounded-lg shadow-md border-2 border-amber-950 flex flex-col"
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
                      handleToggleIngredientes(index);
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
                        className=" transition duration-300 text-sm ease-in-out hover:bg-gray-100 hover:text-gray-700"
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
                <a
                  href="#"
                  className="bg-primaryColor text-white px-2 py-1 rounded-md"
                >
                  Exemplos
                </a>
              </div>
              <button
                onClick={() => {
                  handleAddToCart(produto);
                }}
                className="bg-primaryColor w-full text-white px-8 py-2 rounded-md mt-4"
              >
                Pedir
              </button>
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
        className={`fixed right-0 top-0 h-screen w-64 bg-white p-4 border-2 border-amber-950 rounded-l-lg shadow-md transition-all duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold">Carrinho de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-lg text-primaryColor">Seu carrinho está vazio.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((product, index) => (
              <li
                key={index}
                className="flex items-between justify-between border-b-2 "
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
          <button
            onClick={() => setIsCartOpen(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Fechar
          </button>
          <button
            onClick={() => {}}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </main>
  );
}
