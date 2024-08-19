import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();

  const handleViewMore = (id_product) => {
    navigate(`/detail?id=${id_product}`);
  };

  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://motoapibackv3.vercel.app/api/getproducts"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error al obtener datos: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(1);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(1);
      } else {
        setItemsToShow(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ejecuta la función al montar el componente para establecer el número correcto de elementos

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(items.length - itemsToShow, 0) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.max(items.length - itemsToShow, 0) ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-10 bg-transparent rounded-xl p-4 shadow-lg shadow-[#0eff06]">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous"
          className="p-2 bg-transparent text-[#0eff06]
     rounded-full hover:bg-gray-400 mx-10"
        >
          <FaChevronLeft
            size="1.5rem"
            className="bg-transparent text-[#0eff06]"
          />
        </button>
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center p-2 box-border"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <img
                  src={item.images}
                  alt={item.productName}
                  className="relative h-48 object-contain w-50 overflow-hidden bg-white border-0 border-gray-200 rounded-badge"
                />
                <button
                  onClick={() => handleViewMore(item.id_product)}
                  className="text-center w-60 mt-2 text-[#0eff06] font-bold"
                >
                  {item.productName}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          aria-label="Next"
          className="p-2 bg-transparent text-[#0eff06]
     rounded-full hover:bg-gray-400 mx-10"
        >
          <FaChevronRight
            size="1.5rem"
            className="bg-transparent text-[#0eff06]"
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
