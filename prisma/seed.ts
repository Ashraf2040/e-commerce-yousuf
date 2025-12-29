import "dotenv/config";
import { prisma } from '../lib/prisma'; 

async function main() {
  // Create or upsert a demo cart with a valid UUID for userId
  // You can replace this with any valid UUID, or generate one if needed
  const demoUserId = "00000000-0000-0000-0000-000000000001"; // Example valid UUID

  await prisma.cart.upsert({
    where: { userId: demoUserId },
    update: {},
    create: { userId: demoUserId },
  });

  const products = [
    { slug: 'classic-white-tee', name: 'Classic White Tee', category: 'Apparel', price: 25.00, rating: 4.8, imageUrl: '/images/white-tee.jpg', description: '100% cotton comfort', isFeatured: true },
    { slug: 'blue-denim-jeans', name: 'Blue Denim Jeans', category: 'Apparel', price: 75.00, rating: 4.6, imageUrl: '/images/denim-jeans.jpg', description: 'Slim fit denim', isFeatured: true },
    { slug: 'noise-cancelling-headphones', name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 299.00, rating: 4.9, imageUrl: '/images/headphones-1.jpg', description: 'Premium audio experience', isFeatured: true },
    { slug: 'macbook-pro-14', name: 'MacBook Pro 14"', category: 'Electronics', price: 1999.00, rating: 4.9, imageUrl: '/images/macbook.jpg', description: 'M3 Pro chip, 18hr battery', isFeatured: true },
    { slug: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'Electronics', price: 999.00, rating: 4.8, imageUrl: '/images/iphone.jpg', description: 'A18 Pro chip, 48MP camera', isFeatured: true },
    { slug: 'apple-watch-ultra', name: 'Apple Watch Ultra', category: 'Accessories', price: 799.00, rating: 4.7, imageUrl: '/images/watch.jpg', description: 'Titanium case, 36hr battery', isFeatured: false },
    { slug: 'air-jordan-1', name: 'Air Jordan 1', category: 'Footwear', price: 150.00, rating: 4.9, imageUrl: '/images/sneakers.jpg', description: 'Premium leather sneakers', isFeatured: true },
    { slug: 'peak-design-backpack', name: 'Peak Design Backpack', category: 'Accessories', price: 199.00, rating: 4.8, imageUrl: '/images/backpack.jpg', description: 'Weatherproof 20L', isFeatured: false },
    { slug: 'airpods-pro-2', name: 'AirPods Pro 2', category: 'Electronics', price: 249.00, rating: 4.7, imageUrl: '/images/airpods.jpg', description: 'Active noise cancellation', isFeatured: true },
    { slug: 'sony-alpha-camera', name: 'Sony Alpha Camera', category: 'Electronics', price: 1299.00, rating: 4.9, imageUrl: '/images/camera.jpg', description: 'Full-frame mirrorless', isFeatured: false },
    { slug: 'oversized-hoodie', name: 'Oversized Hoodie', category: 'Apparel', price: 65.00, rating: 4.6, imageUrl: '/images/hoodie.jpg', description: 'Cozy fleece lined', isFeatured: true },
    { slug: 'rayban-wayfarer', name: 'Ray-Ban Wayfarer', category: 'Accessories', price: 145.00, rating: 4.8, imageUrl: '/images/sunglasses.jpg', description: 'Classic polarized lenses', isFeatured: false },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product, // Update with all fields if it already exists
      create: {
        ...product,
        stock: 99, // Explicitly set (matches default)
      },
    });
  }

  console.log(`✅ Seeded ${products.length} products + demo cart!`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });