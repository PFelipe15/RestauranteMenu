"use client";
import Image, { StaticImageData } from "next/image";
import Logo from "../assets/logo.png";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import OrcamentoDialog from "./components/OrcamentoModal";
import axios from "axios";
import ProdutosWRGESSO from "./data/services";
export default function Home() {
  const [productName, setProductName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [cancelGps, setCancelGps] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<
    StaticImageData[] | null
  >(null);
  const [ampliarImageIndex, setAmpliarImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (cancelGps === false) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=pt-BR&zoom=18`;

          axios
            .get(url)
            .then(function (response) {
              if (response.status === 200) {
                return response.data;
              } else {
                throw new Error("Erro na requisição.");
              }
            })
            .then(function (data) {
              setUserLocation(data.display_name);
            })
            .catch(function (error) {
              console.error(error);
            });
        });
      } else {
        alert("A geolocalização não é suportada neste navegador.");
        setCancelGps(true);
      }
    }
  }, [cancelGps]);

  const showImageGallery = (gallery: StaticImageData[]) => {
    setCurrentGallery(gallery);
    setIsGalleryOpen(true);
  };

  const ImageGallery = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsGalleryOpen(false)}
          >
            Fechar
          </button>
          <div className="image-container grid grid-cols-3 gap-4">
            {ampliarImageIndex !== null && <AmpliarModal />}
            {currentGallery &&
              currentGallery.map((image, index) => (
                <div
                  key={index}
                  className="relative group"
                  onClick={() => setAmpliarImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
                    <button className="text-white hover:text-gray-300">
                      Ampliar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const AmpliarModal = () => {
    if (ampliarImageIndex === null) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setAmpliarImageIndex(null)}
          >
            Fechar
          </button>

          {currentGallery &&
            ampliarImageIndex !== null &&
            currentGallery[ampliarImageIndex] !== null && (
              <Image
                src={currentGallery[ampliarImageIndex]}
                alt={`Imagem ${ampliarImageIndex + 1}`}
                className="w-full h-96 object-contain"
              />
            )}
        </div>
      </div>
    );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handlePedirOrcamento = async (nomeProduto: string) => {
    setProductName(nomeProduto);
    setIsDialogOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-blue-500 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image alt="logo" src={Logo} width={50} height={50} />
            <div className="text-white">
              <h1 className="text-xl font-semibold">WR GESSO</h1>
              <p className="text-xs">Gesso de Excelência, Teto de Elegância.</p>
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
                const link = `https://api.whatsapp.com/send?phone=5586988034600&text=Olá, estou querendo solicitar um Orcamento!`;

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
          </div>
        </div>
      </header>

      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {ProdutosWRGESSO.map((produto, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-200 flex flex-col"
          >
            <div className="flex items-center justify-center">
              <Image
                alt="produto imagem"
                src={produto.imagem}
                width={700}
                height={300}
              />
            </div>
            <h2 className="text-lg font-semibold mt-2">
              {produto.nome} (por {produto.tipoMetro})
            </h2>
            <p className="text-gray-600 text-sm">{produto.descricao}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-xl font-semibold text-blue-500">
                R$ {produto.preco.toFixed(2)} / {produto.tipoMetro}
              </p>
              <a
                href="#"
                className="bg-blue-900 text-white px-2 py-1 rounded-md"
                onClick={() => showImageGallery(produto.galery)}
              >
                Exemplos
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
            {isGalleryOpen && <ImageGallery />}

            {isDialogOpen && (
              <OrcamentoDialog
                productName={productName.toString()}
                handleCloseModal={handleCloseDialog}
                userLocation={userLocation.toString()}
              />
            )}
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
