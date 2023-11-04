"use client";
import Image from "next/image";
import imagem from "../assets/banner.jpg";
import Logo from "../assets/logo.png";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import OrcamentoDialog from "./components/OrcamentoModal";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const produtosWRGESSO = [
    {
      nome: "Forro de Gesso (por metro)",
      preco: 49.99,
      imagem: imagem,
      descricao:
        "Forro de gesso de alta qualidade para transformar seus tetos com elegância e sofisticação.",
    },
    {
      nome: "Sancas de Gesso (por metro)",
      preco: 29.99,
      imagem: imagem,
      descricao:
        "Sancas de gesso elegantes para adicionar um toque de estilo aos seus ambientes.",
    },
    {
      nome: "Divisórias de Gesso (por metro)",
      preco: 99.99,
      imagem: imagem,
      descricao:
        "Divisórias de gesso versáteis para criar espaços funcionais em seu interior.",
    },
    {
      nome: "Molduras de Gesso (por metro)",
      preco: 19.99,
      imagem: imagem,
      descricao:
        "Molduras de gesso decorativas para realçar a beleza de suas paredes e tetos.",
    },
    // Adicione mais produtos conforme necessário
  ];

  const handlePedirOrcamento = async (nomeProduto: string) => {
    setProductName(nomeProduto);
    setIsDialogOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-blue-500 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image alt="logo" src={Logo} width={80} height={80} />
            <div className="text-white">
              <h1 className="text-2xl font-semibold">WR GESSO</h1>
              <p className="text-sm">Gesso de Excelência, Teto de Elegância.</p>
            </div>
          </div>
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
        </div>
      </header>

      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {produtosWRGESSO.map((produto, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-200 flex flex-col"
          >
            <div className="flex items-center justify-center">
              <Image
                alt="produto imagem"
                src={produto.imagem}
                width={300}
                height={200}
              />
            </div>
            <h2 className="text-lg font-semibold mt-2">{produto.nome}</h2>
            <p className="text-gray-600 text-sm">{produto.descricao}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-xl font-semibold text-blue-500">
                R$ {produto.preco.toFixed(2)} / metro
              </p>
              <a
                href="#"
                className="bg-blue-900 text-white px-2 py-1 rounded-md"
              >
                Imagens
              </a>
            </div>
            <button
              onClick={() => {
                handlePedirOrcamento(produto.nome);
              }}
              className="bg-blue-500 w-full text-white px-8 py-2 rounded-md mt-4"
            >
              Pedir Orçamento
            </button>

            {isDialogOpen && <OrcamentoDialog productName={productName} />}
          </div>
        ))}
      </section>

      <div className="bg-white p-4 border-t border-gray-200 flex justify-between items-center flex-col">
        <div className="flex items-center p-2">
          <FaMapMarkerAlt className="text-blue-500 mr-3 " size={24} />
          <p className="text-blue-500">
            Rua Adão Belarmino, 1992 - Parque Piauí II, Timon - MA, 65636-540,
            Brasil
          </p>
        </div>
      </div>
    </main>
  );
}
