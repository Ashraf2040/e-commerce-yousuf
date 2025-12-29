import { Header } from './components/Header';
import { Carousel } from './components/Carousel';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { prisma } from '@/lib/prisma';

/* 1️⃣ Helper function */
async function getProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      price: true,
      rating: true,
      imageUrl: true,
    },
  });
}

/* 2️⃣ Infer product type automatically */
type Product = Awaited<ReturnType<typeof getProducts>>[number];

export default async function HomePage() {
  /* 3️⃣ Fetch inside async Server Component */
  const products: Product[] = await getProducts();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100">
        <section className="mt-6">
          <Carousel />
        </section>

        <section className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start gap-4">
          <Sidebar />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
