import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";

interface ModalInf {
  productName: string;
  handleCloseModal: () => void;
}
export default function OrcamentoDialog({
  productName,
  handleCloseModal,
}: ModalInf) {
  const [hasMeasurements, setHasMeasurements] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirmOrcamento = () => {
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
    }

    let metragem = "";

    if (hasMeasurements) {
      if (largura && comprimento) {
        const total = Number(largura) + Number(comprimento);
        metragem = `Minhas metragens são Largura: ${largura} x Comprimento: ${comprimento}, dando um total de ${total} metros quadrados.`;
      } else {
        alert("Por favor, preencha os valores de largura e comprimento.");
        return;
      }
    }

    const productInfo = `Quero fazer um orçamento de ${productName}, moro em ${userLocation}. ${metragem}`;
    const link = `https://api.whatsapp.com/send?phone=5586988034600&text=Olá, ${productInfo}`;

    const newTab = window.open(link, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      window.location.href = link;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Confirmação de Orçamento"
      className="bg-white border border-gray-300 p-4 rounded-md shadow-lg max-w-sm mx-auto"
      overlayClassName="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-semibold">Confirmação de Orçamento</h2>
      <p className="text-gray-600">
        Deseja informar as medidas da metragem para o orçamento?
      </p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setHasMeasurements(true)}
          className={`${
            hasMeasurements
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded-md hover:bg-blue-600`}
        >
          Sim
        </button>
        <button
          onClick={() => setHasMeasurements(false)}
          className={`${
            !hasMeasurements
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded-md hover:bg-blue-600`}
        >
          Não
        </button>
      </div>

      <div>
        {hasMeasurements ? (
          <div className="flex mt-3  items-center justify-evenly">
            <div className="flex flex-col items-center">
              <input
                className="bg-white text-blue-500 w-24 py-2 rounded-md border border-blue-600"
                type="number"
                value={largura}
                onChange={(e) => setLargura(e.target.value)}
              />
              <span>Largura</span>
            </div>
            <p>x</p>
            <div className="flex flex-col items-center">
              <input
                className="bg-white text-blue-500 w-24 py-2 rounded-md border border-blue-600"
                type={Number(largura) ? "number" : "text"} // Altera para texto se largura não for um número
                value={comprimento}
                onChange={(e) => setComprimento(e.target.value)}
              />
              <span>Comprimento</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <button
        onClick={handleConfirmOrcamento}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
      >
        Confirmar
      </button>

      <button
        onClick={handleCloseModal}
        className="mt-4 text-blue-500 hover:underline cursor-pointer w-full"
      >
        Fechar
      </button>
    </Modal>
  );
}
