import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const FiltroRoupas = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Mock data for colors, brands, and sizes
  const colors = ["Red", "Blue", "Green", "Yellow"];
  const brands = ["Nike", "Adidas", "Puma", "Reebok"];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="p-4 left-0 top-[285px] absolute  h-full">
      <h2 className="text-xl font-semibold mb-2">Filtrar por:</h2>
      <div className="space-y-4">
        {/* Color filter */}
        <div className="flex gap-4 items-center">
          <label htmlFor="colorFilter" className="font-medium">
            Cor:
          </label>
          <select
            id="colorFilter"
            className="border w-full rounded-md p-2"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">CXor</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Brand filter */}
        <div className="flex gap-4 items-center">
          <label htmlFor="brandFilter" className="font-medium">
            Marca:
          </label>
          <select
            id="brandFilter"
            className="border w-full rounded-md p-2"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Marca</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Size filter */}
        <div className="flex gap-4 items-center">
          <label htmlFor="sizeFilter" className="font-medium">
            Tamanho:
          </label>
          <select
            id="sizeFilter"
            className="  border w-full rounded-md p-2"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Tamanho</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-primary text-primary-foreground p-2 rounded-md px-4">
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default FiltroRoupas;
