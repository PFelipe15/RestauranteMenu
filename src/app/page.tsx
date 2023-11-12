"use client";
import Image, { StaticImageData } from "next/image";
import Logo from "./assets/logo.png";
import { FaMapMarkerAlt, FaMobileAlt, FaMoneyBillAlt } from "react-icons/fa";
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

export default function Home() {
  const [itsDown, setItsDown] = useState(false);
  const [showIgredients, setShowIgredients] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("pix");
  const handleAddToCart = (product: { nome: string }): void => {
    setCart([...cart, product]);
    Toastify({
      text: `${product.nome} Adicionado ao Carrinho`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #362219, green)",
      },
    }).showToast();
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
    let mensagem = `Olá! 😊 Gostaria de fazer o seguinte pedido no Restaurante Flutuante:\n\n`;

    cart.forEach((produto, index) => {
      mensagem += `${index + 1}. ${
        produto.nome
      } - 💵 R$ ${produto.preco.toFixed(2)}\n`;
    });

    const emojis = {
      smiley: "😊",
      thumbsUp: "👍",
      phone: "📱",
      money: "💵",
      clock: "🕒",
    };
    const total = cart.reduce((acc, produto) => acc + produto.preco, 0);
    mensagem += `\nTotal: 💵 R$ ${total.toFixed(2)}`;

    // Adding payment method information to the message
    mensagem += `\n\nMétodo de Pagamento: ${
      paymentMethod === "pix"
        ? ` PIX ${emojis.phone} `
        : ` Espécie ${emojis.money}  `
    }`;

    // Emojis for a more pleasant message

    mensagem += `\n\n${emojis.smiley} Obrigado por escolher o Restaurante Flutuante! ${emojis.smiley}`;
    mensagem += `\n${emojis.thumbsUp} Aguarde nossa confirmação. Estamos preparando tudo com carinho! ${emojis.thumbsUp}`;
    mensagem += `\n${emojis.clock} O prazo estimado de entrega é de 30 a 40 minutos. Agradecemos pela sua paciência!`;

    const link = `https://api.whatsapp.com/send?phone=5586988034600&text=${encodeURIComponent(
      mensagem
    )}`;

    const newTab = window.open(link, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      window.location.href = link;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="bg-primaryColor p-4 shadow-md w-full">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              alt="logo"
              src={Logo}
              className="2xl:w-24"
              width={60}
              height={60}
            />
            <div className="text-white">
              <h1 className="text-xl 2xl:text-4xl font-semibold">
                Restaurante Flutuante
              </h1>
              <p className="text-xs 2xl:text-xl">
                Servico especializado em Pratos Tipicos
              </p>
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
                const link = `https://api.whatsapp.com/send?phone= &text=Olá, estou querendo solicitar um Orçamento!`;

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
              className="bg-white text-sm text-red-primaryColor gap-1 flex rounded-md px-2 py-2 items-center justify-center "
            >
              Localização
              <FaMapMarkerAlt size={25} />
            </button>
            <button
              onClick={() => {
                // Abrir uma janela ou diálogo para permitir que o usuário compartilhe a localização
                if ("geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;
                      const link = `https://maps.google.com/maps?q=${latitude},${longitude}`;

                      const newTab = window.open(link, "_blank");
                      if (newTab) {
                        newTab.focus();
                      } else {
                        window.location.href = link;
                      }
                    },
                    (error) => {
                      console.error("Erro ao obter a localização:", error);
                      // Aqui você pode fornecer um feedback ao usuário sobre o erro
                    }
                  );
                } else {
                  console.error(
                    "Geolocalização não é suportada pelo navegador."
                  );
                  // Aqui você pode fornecer um feedback ao usuário sobre a falta de suporte à geolocalização
                }
              }}
              className="bg-white text-sm text-red-primaryColor gap-1 flex rounded-md px-2 py-2 items-center justify-center "
            >
              Compartilhar Localização
              <FaMapMarkerAlt size={25} />
            </button>
          </div>
        </div>
      </header>

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
    </main>
  );
}
