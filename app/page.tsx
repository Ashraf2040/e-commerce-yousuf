

import { Header } from './components/Header';
import { Carousel } from './components/Carousel';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import {prisma} from '@/lib/prisma';

  const products = await prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      price: true,
      rating: true,
      imageUrl: true
    }
  })
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <section className="mt-6">
          <Carousel />
        </section>

        <section className=" mx-auto mt-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start gap-4 ">
          <Sidebar />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p, index) => (
              <ProductCard key={p.name + index} {...p} />
            ))}
          </div>
        </section>

       
      </main>
      <Footer />
    </>
  );
}
