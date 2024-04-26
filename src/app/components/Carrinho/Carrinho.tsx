import React, { useState } from "react";
import { FaMobileAlt, FaMoneyBillAlt } from "react-icons/fa";
import OptionModal from "../OptionModal/OptionModal";

interface CarrinhoProps {
  isCartOpen: boolean;
  closeModal: () => void; // Função para fechar o carrinho
  openModal: ()=>void; // Função para chamar showModal
  setIsCartOpen: (isOpen: boolean) => void; // Função para definir o estado de isCartOpen
  sendMessage: () => void; // Função sendMessage
}

const Carrinho: React.FC<CarrinhoProps> = ({ isCartOpen, closeModal, openModal, setIsCartOpen, sendMessage }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("pix");

  const handleRemoveFromCart = (product: any) => {
    const updatedCart = cart.filter((item) => item.nome !== product.nome);
    setCart(updatedCart);
  };


  
 
  return (
    <div
      className={`fixed right-0 top-0 w-72 h-full bg-white p-4 border-2 border-amber-950 rounded-l-lg shadow-md transition-all duration-300 max-h-screen overflow-y-auto ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Carrinho de Compras</h2>
      {cart.length === 0 ? (
        <p className="text-lg text-primary">Seu carrinho está vazio. 😢</p>
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
    
  );
};

export default Carrinho;
