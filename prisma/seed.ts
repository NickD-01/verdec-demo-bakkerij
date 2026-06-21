import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { FOOD_IMAGES } from "../lib/images";

const prisma = new PrismaClient();

const categories = [
  { name: "Brood",        slug: "brood",       sortOrder: 1 },
  { name: "Viennoiserie", slug: "viennoiserie", sortOrder: 2 },
  { name: "Gebak",        slug: "gebak",        sortOrder: 3 },
  { name: "Dranken",      slug: "drinks",       sortOrder: 4 },
];

const products = [
  { name: "Wit brood",           description: "Klassiek witbrood, dagelijks vers gebakken.",                price: 2.8, imageUrl: FOOD_IMAGES.witbrood,      popular: true,  allowsSauceCustomization: false, categorySlug: "brood" },
  { name: "Bruin brood",         description: "Licht bruin brood met zachte korst.",                        price: 3.0, imageUrl: FOOD_IMAGES.bruinbrood,    popular: false, allowsSauceCustomization: false, categorySlug: "brood" },
  { name: "Volkorenbrood",       description: "Volkorenmeel, rijk aan vezels.",                             price: 3.2, imageUrl: FOOD_IMAGES.volkoren,      popular: false, allowsSauceCustomization: false, categorySlug: "brood" },
  { name: "Croissant",           description: "Boterig en krokant, vers uit de oven.",                      price: 2.0, imageUrl: FOOD_IMAGES.croissant,     popular: true,  allowsSauceCustomization: false, categorySlug: "viennoiserie" },
  { name: "Pain au chocolat",    description: "Bladerdeeg gevuld met pure chocolade.",                      price: 2.2, imageUrl: FOOD_IMAGES.painChocolat,  popular: true,  allowsSauceCustomization: false, categorySlug: "viennoiserie" },
  { name: "Chausson aux pommes", description: "Bladerdeeg met appelvulling.",                               price: 2.2, imageUrl: FOOD_IMAGES.chausson,     popular: false, allowsSauceCustomization: false, categorySlug: "viennoiserie" },
  { name: "Appeltaart",          description: "Huisgemaakt met verse appels en kaneel.",                    price: 3.5, imageUrl: FOOD_IMAGES.appeltaart,    popular: true,  allowsSauceCustomization: false, categorySlug: "gebak" },
  { name: "Chocolade éclair",    description: "Soesdeeg gevuld met banketbakkersroom en chocoladeglazuur.", price: 3.0, imageUrl: FOOD_IMAGES.eclair,        popular: false, allowsSauceCustomization: false, categorySlug: "gebak" },
  { name: "Frambozentaartje",    description: "Vers banketbakkersroom met seizoensframbozen.",              price: 3.5, imageUrl: FOOD_IMAGES.frambozentaart,popular: false, allowsSauceCustomization: false, categorySlug: "gebak" },
  { name: "Koffie",              description: "Versgemalen espresso of lungo.",                             price: 2.0, imageUrl: FOOD_IMAGES.koffie,        popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
  { name: "Thee",                description: "Selectie van losse theesoorten.",                            price: 2.0, imageUrl: FOOD_IMAGES.thee,          popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
  { name: "Plat water",          description: "Flesje 50cl.",                                               price: 1.5, imageUrl: FOOD_IMAGES.water,         popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
  { name: "Chocolademelk",       description: "Warme of koude chocolademelk 25cl.",                        price: 2.5, imageUrl: FOOD_IMAGES.cola,          popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
];

async function seedDemoOrders(productMap: Record<string, { id: string; price: number; name: string }>) {
  const p1 = productMap["Croissant"];
  const p2 = productMap["Appeltaart"];
  const p3 = productMap["Koffie"];
  if (!p1 || !p2 || !p3) return;
  const demoOrders = [
    { daysAgo: 0, status: "PENDING",   name: "Jan Peeters",    phone: "+32 470 11 22 33", paymentMethod: "ONLINE", paymentStatus: "PAID" },
    { daysAgo: 0, status: "PREPARING", name: "Marie Dubois",   phone: "+32 471 44 55 66", paymentMethod: "CASH",   paymentStatus: "UNPAID" },
    { daysAgo: 1, status: "COMPLETED", name: "Tom Janssens",   phone: "+32 472 77 88 99", paymentMethod: "ONLINE", paymentStatus: "PAID" },
    { daysAgo: 2, status: "COMPLETED", name: "Lisa Vermeulen", phone: "+32 473 00 11 22", paymentMethod: "CASH",   paymentStatus: "PAID" },
    { daysAgo: 3, status: "COMPLETED", name: "Pieter De Smet", phone: "+32 474 33 44 55", paymentMethod: "ONLINE", paymentStatus: "PAID" },
    { daysAgo: 4, status: "COMPLETED", name: "Emma Claes",     phone: "+32 475 66 77 88", paymentMethod: "CASH",   paymentStatus: "PAID" },
  ];
  for (let i = 0; i < demoOrders.length; i++) {
    const demo = demoOrders[i];
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - demo.daysAgo);
    createdAt.setHours(7 + (i % 4), 30, 0, 0);
    const total = p1.price * 2 + p2.price + p3.price;
    const orderNumber = `BK-DEMO-${String(1000 + i)}`;
    const existing = await prisma.order.findUnique({ where: { orderNumber } });
    if (existing) continue;
    const slotDate = new Date(createdAt);
    slotDate.setMinutes(Math.ceil(slotDate.getMinutes() / 30) * 30, 0, 0);
    await prisma.order.create({
      data: {
        orderNumber, customerName: demo.name, customerPhone: demo.phone,
        pickupTime: slotDate.toLocaleString("nl-BE", { weekday: "short", hour: "2-digit", minute: "2-digit" }),
        pickupSlot: slotDate.toISOString(), status: demo.status, total,
        paymentMethod: demo.paymentMethod, paymentStatus: demo.paymentStatus, createdAt,
        items: { create: [
          { productId: p1.id, quantity: 2, price: p1.price, name: p1.name },
          { productId: p2.id, quantity: 1, price: p2.price, name: p2.name },
          { productId: p3.id, quantity: 1, price: p3.price, name: p3.name },
        ]},
      },
    });
  }
}

async function main() {
  console.log("Seeding Bakkerij Demo database...");
  const adminEmail = process.env.ADMIN_EMAIL || "owner@verdec.be";
  const adminPassword = process.env.ADMIN_PASSWORD || "VerdecDemo2026!";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: { email: adminEmail, password: hashedPassword, name: "Zaakvoerder", role: "OWNER" },
  });
  await prisma.settings.upsert({
    where: { id: "default" },
    update:  { restaurantName: "Bakkerij Demo", phone: "0499 00 00 00", address: "Voorbeeldstraat 1, 1000 Brussel", openingHours: "Di-zo: 07:00 - 13:00", tagline: "Dagelijks vers gebakken", minLeadTimeMinutes: 30, slotIntervalMinutes: 30, maxOrdersPerSlot: 15, openTime: "07:00", closeTime: "13:00" },
    create: { id: "default", restaurantName: "Bakkerij Demo", phone: "0499 00 00 00", address: "Voorbeeldstraat 1, 1000 Brussel", openingHours: "Di-zo: 07:00 - 13:00", tagline: "Dagelijks vers gebakken", minLeadTimeMinutes: 30, slotIntervalMinutes: 30, maxOrdersPerSlot: 15, openTime: "07:00", closeTime: "13:00" },
  });
  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: { name: cat.name, sortOrder: cat.sortOrder }, create: cat });
  }
  const categoryMap = await prisma.category.findMany();
  const slugToId = Object.fromEntries(categoryMap.map((c) => [c.slug, c.id]));
  const productMap: Record<string, { id: string; price: number; name: string }> = {};
  for (const product of products) {
    const categoryId = slugToId[product.categorySlug];
    if (!categoryId) continue;
    const data = { name: product.name, description: product.description, price: product.price, imageUrl: product.imageUrl, popular: product.popular, available: true, allowsSauceCustomization: product.allowsSauceCustomization, categoryId };
    const existing = await prisma.product.findFirst({ where: { name: product.name, categoryId } });
    const record = existing ? await prisma.product.update({ where: { id: existing.id }, data }) : await prisma.product.create({ data });
    productMap[product.name] = { id: record.id, price: record.price, name: record.name };
  }
  await seedDemoOrders(productMap);
  console.log("Seed completed!");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
