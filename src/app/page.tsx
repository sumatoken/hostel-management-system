import Onboarding from "@/components/widgets/onboarding";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4">
      <div className="w-full h-full relative flex  items-center justify-center place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] z-0">
        <div className="w-full h-screen flex items-center justify-center">
          <Onboarding />
        </div>
      </div>
    </main>
  );
}
