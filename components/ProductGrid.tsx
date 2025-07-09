"use client";
import React, { useEffect, useState } from 'react';
import HomeTabBar from './HomeTabBar';
import { client } from '@/sanity/lib/client';
import Container from './Container';
import { productType } from '@/constants/Data';
import { motion, AnimatePresence } from "framer-motion";
import NoProductAvailable from './NoProductAvailable';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/sanity.types';

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  useEffect(() => {
    const query = `*[_type == "product" && variant == $variant] | order(name asc){
      ...,"categories": categories[]->title
    }`;
    const params = { variant: selectedTab.toLowerCase() };

    const fetchData = async () => {
      setLoading(true);

      // ✅ Log Sanity env vars at runtime
      console.log("🔍 ENV CHECK:", {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        nodeEnv: process.env.NODE_ENV,
      });

      // ✅ Log query and parameters
      console.log("🧾 Running GROQ query:", { query, params });

      try {
        const response = await client.fetch(query, params);
        console.log("📦 Fetched products:", response);
        setProducts(await response);
      } catch (error) {
        console.error("❌ Product fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <Container className="flex flex-col lg:px-0 my-12">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 min-h-80 space-y-4 text-center bg-[#F8F7F4] rounded-xl shadow-[3px_3px_8px_rgba(0,0,0,0.08),-3px_-3px_8px_rgba(255,255,255,0.9)] mt-8">
          <motion.div
            className="flex items-center space-x-2 text-[#2A4D3E]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="w-5 h-5 animate-spin text-[#2A4D3E]" />
            <span className="text-sm font-medium">Loading Products...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {products.map((product) => (
            <AnimatePresence key={product._id}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProductCard key={product._id} product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </Container>
  );
};

export default ProductGrid;
