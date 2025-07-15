// import Container from '@/components/Container'
// import HomeBanner from '@/components/HomeBanner'
// import ProductGrid from '@/components/ProductGrid'
// import React from 'react'

// const page = () => {
//   return (
//     <Container className='bg-white'>
//       <HomeBanner />
//       <div className='py-10'>
//         <ProductGrid />
//         {/* <HomeCategories categories={categories} /> */}
//       </div>
//     </Container>
//   )
// }

import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
// import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";

import React from "react";

const page = async () => {
  const categories = await getCategories(6);

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrands />
      {/* <LatestBlog /> */} 
    </Container>
  );
};

export default page;