# LUMINA | Premium Product Showcase

LUMINA is a high-impact, premium product catalog/showcase built with the **T3 Stack**. It features a modern "Snow & Azure" light theme with glassmorphism, smooth animations, and a fully dynamic backend.

## 🚀 Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org)
- **Data Fetching**: [tRPC](https://trpc.io) (End-to-end type safety)
- **Database**: [Prisma](https://prisma.io) with SQLite
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Premium Visuals)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev)

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Database**:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📦 Data Management (No Hardcoding)

Manage your products and categories without touching any code using **Prisma Studio**:

```bash
npx prisma studio
```

## ✨ Features

- **Dynamic Catalog**: Products are fetched in real-time via tRPC.
- **Glassmorphism UI**: Beautifully blurred navigation and card elements.
- **Showcase Mode**: Focused on advertising and brand storytelling (No cart/auth friction).
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
