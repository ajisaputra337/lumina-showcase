import { HydrateClient, api } from "~/trpc/server";
import { Navbar } from "~/app/_components/Navbar";
import { HomeContent } from "~/app/_components/HomeContent";

export default async function Home() {
  const products = await api.product.getAll({});

  const sidebarLeft = products.filter(p => p.sidebarSide === "LEFT");
  const sidebarRight = products.filter(p => p.sidebarSide === "RIGHT");
  const heroHighlight = products.find(p => p.isHeroHighlight) ?? products[0];

  return (
    <HydrateClient>
      <main className="min-h-screen bg-snow relative">
        <Navbar />

        <HomeContent
          sidebarLeft={sidebarLeft}
          sidebarRight={sidebarRight}
          heroHighlight={heroHighlight}
        />

        {/* Simple Footer */}
        <footer className="border-t border-slate-100 py-12 mt-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-bold text-gradient">LUMINA</div>
            <div className="flex space-x-8 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-azure transition-colors">Twitter</a>
              <a href="#" className="hover:text-azure transition-colors">Instagram</a>
              <a href="#" className="hover:text-azure transition-colors">Contact</a>
            </div>
            <p className="text-xs text-slate-400 font-medium">© 2026 LUMINA.</p>
          </div>
        </footer>
      </main>
    </HydrateClient>
  );
}
