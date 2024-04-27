import React, { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function OptionModal({ closeModal }: () => void) {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    "automatic" | "manual" | "preferNotToSay"
  >("automatic");
  const [paymentMethod, setPaymentMethod] = useState<string>("pix");
  const [location, setLocation] = useState<string>("");
  const [manualAddress, setManualAddress] = useState({
    bairro: "",
    rua: "",
    casa: "",
    complemento: "",
  });

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

  const handleManualAddressChange = (field: any, value: any) => {
    setManualAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  const handleManualAddressConfirm = () => {
    if (
      manualAddress.bairro.trim() === "" ||
      manualAddress.rua.trim() === "" ||
      manualAddress.casa.trim() === ""
    ) {
      chamaToastify("Por favor, preencha todos os campos do endereço.", "red");
      return; // Não continua a execução se algum campo estiver em branco
    }

    const formattedManualAddress = Object.values(manualAddress)
      .filter((value) => value.trim() !== "")
      .join(", ");

    setLocation(formattedManualAddress);

    chamaToastify(
      `Endereço confirmado. Clique em Confirmar para finalizar.`,
      "green"
    );
  };

  const getLocationAutomatically = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const link = `https://maps.google.com/maps?q=${latitude},${longitude}`;
            resolve(link);
          },
          (error) => {
            chamaToastify("Erro ao obter a localização:", "red");
            console.error("Erro ao obter a localização:", error);
            reject(error);
          }
        );
      } else {
        chamaToastify(
          "Geolocalização não é suportada pelo navegador.",
          "yellow"
        );
        reject("Geolocalização não suportada");
      }
    });
  };

  const confirmSendMessage = async () => {
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
      location: "📍",
      casa: "🏠",
      rua: "🛣️",
      bairro: "🏡",
      complemento: "🔍",
    };

    const total = cart.reduce((acc, produto) => acc + produto.preco, 0);
    mensagem += `\nTotal: 💵 R$ ${total.toFixed(2)}`;

    // Adicionando informações de método de pagamento à mensagem
    mensagem += `\n\nMétodo de Pagamento: ${
      paymentMethod === "pix"
        ? ` PIX ${emojis.phone} `
        : ` Espécie ${emojis.money}  `
    }`;

    // Emojis para uma mensagem mais agradável
    mensagem += `\n\n${emojis.smiley} Obrigado por escolher o Restaurante Flutuante! ${emojis.smiley}`;
    mensagem += `\n${emojis.thumbsUp} Aguarde nossa confirmação. Estamos preparando tudo com carinho! ${emojis.thumbsUp}`;
    mensagem += `\n${emojis.clock} O prazo estimado de entrega é de 30 a 40 minutos. Agradecemos pela sua paciência!`;

    // Adicionando a localização com base no selectedOption
    switch (selectedOption) {
      case "automatic":
        const location = await getLocationAutomatically();
        mensagem += `\n\n${emojis.location} Localização Automática: Estou enviando minha localização atual.\n\n ${location}`;
        break;
      case "manual":
        if (manualAddress.bairro && manualAddress.rua && manualAddress.casa) {
          mensagem += `\n\n${emojis.location} Localização Manual:\n`;
          mensagem += `${emojis.casa} Casa: ${manualAddress.casa}\n`;
          mensagem += `${emojis.rua} Rua: ${manualAddress.rua}\n`;
          mensagem += `${emojis.bairro} Bairro: ${manualAddress.bairro}\n`;
          if (manualAddress.complemento) {
            mensagem += `${emojis.complemento} Complemento: ${manualAddress.complemento}\n`;
          }
        } else {
          Toastify({
            text: "Por favor, preencha todos os campos do endereço.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            style: {
              background: "red",
            },
          }).showToast();
          return;
        }
        break;
      case "preferNotToSay":
        mensagem += `\n\n${emojis.location} Preferi não informar a localização: Enviarei a minha localização pelo WhatsApp.`;
        break;
      default:
        break;
    }

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
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Escolha uma opção:</h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="automatic"
                checked={selectedOption === "automatic"}
                onChange={() => setSelectedOption("automatic")}
                className="mr-2"
              />
              Localização Atual
            </label>
            {selectedOption === "automatic" && (
              <p className="text-sm text-gray-600 mb-4">
                A localização atual automatica, será mandado o pedido para sua
                localização atual.
              </p>
            )}
            <label className="flex items-center">
              <input
                type="radio"
                value="manual"
                checked={selectedOption === "manual"}
                onChange={() => setSelectedOption("manual")}
                className="mr-2"
              />
              Colocar Endereço Manualmente
            </label>
            {selectedOption === "manual" && (
              <div className=" ">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bairro
                  </label>
                  <input
                    type="text"
                    placeholder="Bairro"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={manualAddress.bairro}
                    onChange={(e) =>
                      handleManualAddressChange("bairro", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Rua
                  </label>
                  <input
                    type="text"
                    placeholder="Rua"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={manualAddress.rua}
                    onChange={(e) =>
                      handleManualAddressChange("rua", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Casa
                  </label>
                  <input
                    type="text"
                    placeholder="Casa"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={manualAddress.casa}
                    onChange={(e) =>
                      handleManualAddressChange("casa", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Complemento
                  </label>
                  <input
                    type="text"
                    placeholder="Complemento"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={manualAddress.complemento}
                    onChange={(e) =>
                      handleManualAddressChange("complemento", e.target.value)
                    }
                  />
                </div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={handleManualAddressConfirm}
                >
                  Confirmar Endereço
                </button>
              </div>
            )}
            <label className="flex items-center">
              <input
                type="radio"
                value="preferNotToSay"
                checked={selectedOption === "preferNotToSay"}
                onChange={() => setSelectedOption("preferNotToSay")}
                className="mr-2"
              />
              Enviar por WhatsApp
            </label>

            {selectedOption === "preferNotToSay" && (
              <p className="text-sm text-gray-600 mb-4">
                Vou enviar minha localização por WhatsApp!
              </p>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => {
                confirmSendMessage();
                closeModal();
              }}
            >
              Confirmar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
