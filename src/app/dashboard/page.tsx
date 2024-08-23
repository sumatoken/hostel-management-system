import Dashboard from "@/components/widgets/dashboard";

export default function Home() {
    return (
        <main className="w-full max-w-[1440px] flex min-h-screen flex-col items-center justify-between px-4 py-8">
            <Dashboard />
        </main>
    );
}
