import React from "react";
import Logo from "../../assets/logo.png";
 
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaLockOpen,
  FaDoorOpen,
} from "react-icons/fa";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-primary-foreground p-8 shadow-md w-full">
      <div className="container mx-auto flex items-center gap-4 justify-between">
        <div>
        <div className="flex items-center space-x-4">
          <Image
            alt="logo"
            src={Logo}
            className="rounded-full border-2 border-white"
            width={60}
            height={60}
          />
          <div className="text-white">
            <h1 className="text-2xl 2xl:text-5xl font-bold tracking-wide">
              Fashion Avenue
            </h1>
            <p className="text-sm 2xl:text-xl">
              Serviço especializado em Pratos Típicos
            </p>
          </div>
        </div>
          <div className="flex gap-2  text-white font-bold items-center mt-4 ">
            <div className=" p-2 bg-white bg-opacity-10 px-4 rounded-md font-bold flex items-center space-x-4 ">
              <a href="#" className="">
                Home
              </a>
              <a href="#" className="">
                Sobre
              </a>
              <a href="#" className="">
                Serviços
              </a>
              <a href="#" className="">
                Contato
              </a>
            </div>

            <div className="bg-green-700 flex items-center rounded-md p-2 gap-2 ">Aberto  <FaDoorOpen size={25} /> </div>
          </div>
        </div>

        <div className="flex items-center flex-col-reverse justify-center gap-3">
          <div className="text-primary flex items-center space-x-2">
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

          <div className="flex gap-2">
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
              <FaWhatsapp size={25} />
              WhatsApp
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
              className="bg-primary text-sm text-primary-foreground gap-1 flex rounded-md px-2 py-2 items-center justify-center "
            >
              <FaMapMarkerAlt size={25} className="text-secondary" />
              Localização
            </button>
          </div>
        </div>
      </div>
    </header>

   
  );
};

export default Header;
