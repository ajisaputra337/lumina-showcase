import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    // Clear existing data in reverse order of dependencies
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Create a mock user
    const user = await prisma.user.create({
        data: {
            name: "Portfolio Admin",
            email: "admin@lumina.com",
        },
    });

    const categories = [
        { name: "Audio" },
        { name: "Peripherals" },
        { name: "Wearables" },
        { name: "Gaming" },
    ];

    for (const cat of categories) {
        await prisma.category.create({ data: cat });
    }

    const audioCat = await prisma.category.findUnique({ where: { name: "Audio" } });
    const periCat = await prisma.category.findUnique({ where: { name: "Peripherals" } });
    const wearCat = await prisma.category.findUnique({ where: { name: "Wearables" } });

    if (audioCat && periCat && wearCat) {
        const products = [
            {
                name: "Sonic A1 | Open Ear",
                description: "Ultimate transparency with high-fidelity sound. Bone conduction technology for the modern athlete.",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
                categoryId: audioCat.id,
                createdById: user.id,
            },
            {
                name: "Keystroke Pro | Mechanical",
                description: "Unmatched tactile feedback with customizable RGB and aluminum housing.",
                price: 189.50,
                image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
                categoryId: periCat.id,
                createdById: user.id,
            },
            {
                name: "Lumina Watch Series 4",
                description: "The most advanced health tracking in a stunning titanium body.",
                price: 449.00,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
                categoryId: wearCat.id,
                createdById: user.id,
            },
            {
                name: "Pixel Mouse | Precision",
                description: "Zero latency wireless gaming mouse with 24k DPI sensor.",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800",
                categoryId: periCat.id,
                createdById: user.id,
            }
        ];

        for (const prod of products) {
            await prisma.product.create({ data: prod });
        }
    }

    console.log("Seed data created successfully with user:", user.email);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
