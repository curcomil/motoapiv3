import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BiSolidQuoteRight } from "react-icons/bi";

export const Card_coment = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getproducts"
        );
        console.log("Data fetched:", response.data);

        // Filtrar los productos que tienen comentarios
        const productsWithReviews = response.data.filter(
          (product) => product.reviews && product.reviews.length > 0
        );

        setReviews(productsWithReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
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
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 1
        ? Math.max(reviews.length - itemsToShow, 0)
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.max(reviews.length - itemsToShow, 0)
        ? 0
        : prevIndex + 1
    );
  };

  const handleViewMore = () => {
    navigate(`/detail?id=${product.id_product}`);
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div className="bg-base-100 w-full max-w-4xl h-auto shadow-lg shadow-[#0eff06] p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="p-2 bg-transparent text-[#0eff06] rounded-full hover:bg-gray-400"
          >
            <FaChevronLeft
              size="1.5rem"
              className="bg-transparent text-[#0eff06]"
            />
          </button>

          <div className="flex flex-col items-center w-full px-4 space-x-4">
            {reviews.length > 0 ? (
              reviews
                .slice(currentIndex, currentIndex + itemsToShow)
                .map((review, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col items-center pb-4"
                    style={{ width: `${100 / itemsToShow}%` }}
                  >
                    <img
                      src={review.images}
                      alt={review.productName}
                      className="h-48 w-48 object-contain bg-white rounded-full mb-4"
                    />
                    <h2 className="text-[#0eff06] text-2xl font-semibold w-full text-center">
                      {review.reviews[0].username.charAt(0).toUpperCase() +
                        review.reviews[0].username.slice(1)}
                    </h2>

                    <div className="border-b-2 border-[#0eff06] w-full mb-4" />
                    <BiSolidQuoteLeft />
                    <p className="text-white text-center mb-4">
                      {review.reviews[0].opinion}
                    </p>
                    <BiSolidQuoteRight />
                    <div className="flex justify-center mb-4">
                      {[...Array(review.reviews[0].rating)].map((_, i) => (
                        <span
                          key={i}
                          className="mask mask-star-2 bg-green-500 w-6 h-6"
                        ></span>
                      ))}
                    </div>
                    <div className="card-actions justify-end">
                      <button
                        onClick={handleViewMore}
                        className="nav-button hover:drop-shadow-lg flex w-full items-center justify-center rounded-full border border-[#0eff06e9] bg-[#0eff06] bg-gradient-to-tr from-[#0eff06] to-[#78c048]/70 px-7 py-2.5 text-base font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1"
                      >
                        <span>Ver Producto</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          className="ml-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-white">No reviews available.</p>
            )}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next"
            className="p-2 bg-transparent text-[#0eff06] rounded-full hover:bg-gray-400"
          >
            <FaChevronRight
              size="1.5rem"
              className="bg-transparent text-[#0eff06]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
