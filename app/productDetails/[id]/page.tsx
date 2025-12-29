// app/productDetails/[id]/page.tsx

import { notFound } from 'next/navigation';
import {prisma} from '@/lib/prisma';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params; 

  console.log('Params received:', await params);
  console.log('Product ID:', id);

  if (!id) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id }, // id is UUID string
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.imageUrl || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-semibold text-purple-700 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-8">
            {product.description || 'No description available.'}
          </p>
          <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-8 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
