"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };

  return (
    <div
      className={cn("absolute top-3 right-3 hover:cursor-pointer", className)}
    >
      <div
        onClick={handleFavorite}
        className={cn(
          "p-2.5 rounded-full transition-shadow duration-300",
          existingProduct
            ? "bg-[#F8F7F4] shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)] text-[#2A4D3E]"
            : "bg-[#F8F7F4] shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)] text-gray-500",
          existingProduct
            ? "hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,1)]"
            : "hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,1)] hover:text-[#2A4D3E]"
        )}
      >
        <Heart
          size={14}
          fill={existingProduct ? "#2A4D3E" : "none"}
          className="transition-colors duration-300"
        />
      </div>
    </div>
  );
};

export default ProductSideMenu;
