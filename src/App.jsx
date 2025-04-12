// pages/index.js
"use client"

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react";

const products = [
  { name: "Sparx Inferno Pro", price: "$350", img: "/red.png" },
  { name: "Sparx Thunder 100", price: "$325", img: "/blue.png" },
  { name: "Sparx Hockey Jersey", price: "$20", img: "/hockey_jersey.png" },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [shrinkHeader, setShrinkHeader] = useState(false);

  const next = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % products.length);
      setFade(true);
    }, 200);
  };

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + products.length) % products.length);
      setFade(true);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShrinkHeader(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-r from-purple-500 to-purple-900 text-white flex flex-col items-center justify-start p-4 overflow-hidden">
      <div className={`z-10 flex flex-col items-center transition-all duration-500 ${shrinkHeader ? "scale-75 mt-2" : "scale-100 mt-6"}`}>
        <img
          src="/public/logo.png"
          alt="Sparx Sports Logo"
          className="w-90 h-90 object-contain mb-2 animate-fadeIn"
        />
        <p className="text-lg text-white/80 tracking-wide mb-2 italic">Unleash the Power of Performance</p>
        <h1 className="text-4xl font-bold mb-2">SparX Sports Products</h1>
      </div>

      <div className="relative z-10 w-full max-w-xl flex items-center justify-center">
        <button onClick={prev} className="absolute left-0 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-700">
          <ArrowLeft />
        </button>

        <div className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"} bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl w-full flex flex-col items-center border border-white/10`}>
          <img src={products[index].img} alt={products[index].name} className="w-64 h-64 object-contain mb-4" />
          <h2 className="text-xl font-semibold text-center">{products[index].name}</h2>
          <p className="text-lg text-green-300">{products[index].price}</p>
        </div>

        <button onClick={next} className="absolute right-0 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-700">
          <ArrowRight />
        </button>
      </div>
      <div className="z-10 mt-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center">
        <p className="text-white text-lg font-semibold mb-2">Contact us on Instagram</p>
        <a
          href="https://www.instagram.com/sparx.sports"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-full text-white"
        >
          <Instagram size={20} /> @SparX Sports Australia
        </a>
      </div>
    </main>
  );
}