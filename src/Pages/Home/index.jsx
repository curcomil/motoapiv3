import { Footer } from "../../Components/footer";
import imgfondo from "../../../dist/assets/img_fondo.png";
import { IoLogoWhatsapp, IoArrowForwardCircle } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";
import Carousel from "../../Components/carousel";
import { Card_coment } from "../../Components/card_coment";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom/dist";
import { Navlink } from "../../Components/Navbar_";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = Cookies.get("isadmin");
    if (isAdmin === "true") {
      navigate("/productos");
    }
  }, [navigate]);

  return (
    <>
      <Navlink />
      <div className="bg-black min-h-screen">
        <div className="relative w-full h-[calc(100vh-56px)]">
          <img
            className="w-full h-full object-cover opacity-90"
            alt="Imagen de fondo"
            src={imgfondo}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-6xl font-bold py-10 text-transparent bg-clip-text bg-gradient-to-b from-[#0eff06] to-white">
              Venta de accesorios para tu motocicleta
            </h1>
            <div className="text-base sm:text-lg flex items-center space-x-2 text-white">
              <span>Conoce nuestros productos</span>
              <Link to="/Menu">
                <IoArrowForwardCircle
                  size="2.5rem"
                  className="text-[#0eff06] hover:text-white"
                />
              </Link>
            </div>
            <a
              className="flex items-center space-x-2 text-base sm:text-lg pt-10 text-white"
              href="https://api.whatsapp.com/send?phone=5610544410&text=Hola%2C%20me%20gustaría%20saber%20cúales%20accesorios%20personalizados%20recomiendan%20para%20mejorar%20el%20estilo%20y%20la%20funcionalidad%20de%20mi%20motocicleta."
              target="_blank"
            >
              <button>Contactanos para pedidos personalizados</button>
              <IoLogoWhatsapp
                size="2.5rem"
                className=" animate-bounce text-[#0eff06] hover:text-white"
              />
            </a>
          </div>
        </div>

        <div className="sticky top-0 h-auto py-10 flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#0d4d0b] text-white">
          <div className=" text-center text-white max-w-4xl space-y-4">
            <br />
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#0eff06] border-[#0eff06] p-2">
              Quienes somos
            </p>
            <p className="border-b-2 border-[#0eff06] p-2 text-lg sm:text-xl md:text-2xl">
              Somos una empresa dedicada a la fabricación de accesorios y
              defensas para cualquier tipo de motocicleta. Nuestro principal
              objetivo es que nuestros clientes se sientan satisfechos con la
              estética personalizada de su moto.
              <br />
              <SlBadge size="2rem" className="text-[#0eff06] inline-block" />
            </p>
          </div>
        </div>

        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0d4d0b] to-black">
          <div className="text-white text-3xl font-bold flex justify-center py-10 ">
            Algunos de nuestros productos
          </div>
          <Carousel />
        </div>

        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0d4d0b] to-black text-white ">
          <h2 className="text-[#0eff06] text-3xl font-bold flex justify-center py-10">
            Comentarios de nuestros clientes
          </h2>
          <Card_coment />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
