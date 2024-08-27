import { ThemeToggle } from "@/components/theme-toggle";
import Onboarding from "@/components/widgets/onboarding";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-88px)] h-full flex-col items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center gap-10">
          <div className="w-full h-full flex flex-col items-center gap-4">
            <span className="max-w-[846px] w-full lg:w-[846px] h-auto font-semibold text-[22px] md:text-[40px] text-center leading-[130%] tracking-[0.32px] md:tracking-[-0.4px]"><span className="text-[#06a2bf] dark:text-[#74e7ff]">Gérer les chambres d&apos;auberge efficacement </span>sans avoir besoin de cahiers.</span>
            <span className={cn("max-w-[846px] w-full lg:w-[846px] h-auto font-normal text-[15px] md:text-[22px] text-center leading-[140%] tracking-[-0.14px] md:tracking-[-0.24px] text-[#0D1C17] dark:text-[#fff] opacity-70")}>Definire le nombre d&apos;étages — chambres par étage — lits par chambre.</span>
          </div>
          <Onboarding />
        </div>
      </main>
      <div className="w-full flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col text-center items-center justify-center">
          <h2 className="sm:text-md font-mono text-sm font-light text-[#06a2bf] dark:text-[#74e7ff]">Gestion Efficace des Chambres d&apos;Auberge</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight dark:text-[#fff] sm:text-5xl">Une solution simple et efficace.</p>
          <p className="text-md mx-auto mt-5 max-w-prose text-gray-500 sm:text-lg">Avec le tableau de bord de gestion des chambres d&apos;auberge, vous pouvez facilement gérer les chambres d&apos;auberge de votre établissement.</p>
          <Image src='/dashboard-1.png' className="mt-2 rounded shadow" width={846} height={500} alt="Dashboard" />
        </div>
        <div className="w-full flex flex-col text-center items-center justify-center">
          <p className="mt-2 text-3xl font-bold tracking-tight dark:text-[#fff] sm:text-5xl">Gérer la disponibilité des chambres et lits d&apos;auberge</p>
          <p className="text-md mx-auto mt-5 max-w-prose text-gray-500 sm:text-lg">D&apos;un simple clic, vous pouvez marquer des chambres et lits d&apos;auberge comme occupés ou disponibles.</p>
          <Image src='/dashboard-2.png' className="mt-2 rounded shadow" width={846} height={500} alt="Dashboard" />
        </div>
        <div className="w-full flex flex-col text-center items-center justify-center">
          <p className="mt-2 text-3xl font-bold tracking-tight dark:text-[#fff] sm:text-5xl">Consulter les informations sur vos clients</p>
          <p className="text-md mx-auto mt-5 max-w-prose text-gray-500 sm:text-lg">Restez informé des informations sur vos clients, vous pouvez consulter leurs contacts et leur durée de réservation.</p>
          <Image src='/dashboard-3.png' className="mt-2 rounded shadow" width={546} height={500} alt="Dashboard" />
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Gérer les chambres d\'auberge efficacement',
}