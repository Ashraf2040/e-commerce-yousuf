import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import { CartItem } from "@/app/store/cartSlice"; // استخدام تعريف CartItem من Redux

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { cartItems, totalAmount } = await req.json();

  if (!cartItems || cartItems.length === 0 || totalAmount === undefined) {
    return NextResponse.json({ message: "Invalid cart data" }, { status: 400 });
  }

  try {
    // 1. Create the Order
    const order = await prisma.order.create({
      data: {
        userId: userId,
        total: totalAmount,
        // يمكن إضافة المزيد من حقول الشحن والدفع هنا
      },
    });

    // 2. Create Order Items
    const orderItemsData = cartItems.map((item: CartItem) => ({
      orderId: order.id,
      productId: item.id, // نفترض أن id المنتج هو نفسه id في قاعدة البيانات
      quantity: item.quantity,
      price: item.price,
    }));

    await prisma.orderItem.createMany({
      data: orderItemsData,
    });

    // 3. (Optional) Clear the server-side cart if implemented, but for now, we rely on client-side Redux

    return NextResponse.json({ message: "Order placed successfully", orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ message: "Failed to place order" }, { status: 500 });
  }
}
