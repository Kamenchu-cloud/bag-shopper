import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductSideMenu from "./ProductSideMenu";
import { Flame, StarIcon } from "lucide-react";
import Title from "./Title";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm rounded-xl bg-[#F8F7F4] shadow-[3px_3px_8px_rgba(0,0,0,0.08),-3px_-3px_8px_rgba(255,255,255,0.9)] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,1)] transition-shadow duration-300 group">
      <div className="relative group overflow-hidden bg-white rounded-t-xl">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).width(500).height(500).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full h-56 object-contain transition-transform duration-300 ease-out 
              ${product?.stock !== 0 ? "group-hover:scale-103" : "opacity-60"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute top-3 left-3 z-10 text-xs font-medium text-[#2A4D3E] bg-[#F8F7F4] shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)] px-3 py-1.5 rounded-full transition-shadow duration-300 group-hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,1)]">
            Sale
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-3 left-3 z-10 bg-[#F8F7F4] shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)] p-2 rounded-full transition-shadow duration-300 group-hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,1)]"
          >
            <Flame
              size={16}
              fill="#D97706"
              className="text-[#D97706] group-hover:text-[#C16A05] transition-colors duration-300"
            />
          </Link>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-gray-500 tracking-widest">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}

        <Title className="text-base font-semibold line-clamp-1 text-gray-900">{product?.name}</Title>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={index < 4 ? "text-amber-600" : "text-gray-300"}
                fill={index < 4 ? "#B45309" : "#D1D5DB"}
                size={14}
              />
            ))}
          </div>
          <p className="text-gray-500 text-xs font-medium">5 Reviews</p>
        </div>

        <div className="flex items-center gap-3 border-t border-gray-200 pt-3">
          <p className="font-medium text-gray-700">In Stock</p>
          <p
            className={`${
              product?.stock === 0
                ? "text-red-500 font-medium"
                : "text-[#2A4D3E] font-medium"
            }`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "Unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-base font-semibold text-gray-900"
        />
        <AddToCartButton
          product={product}
          className="w-36 rounded-full bg-[#F8F7F4] shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)] text-[#2A4D3E] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,1)] transition-shadow duration-300"
        />
      </div>
    </div>
  );
};

export default ProductCard;