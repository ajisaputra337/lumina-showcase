import { Navbar } from "~/app/_components/Navbar";
import { AdminProductList } from "./_components/AdminProductList";

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-snow">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-16">
                <AdminProductList />
            </div>
        </main>
    );
}
