import Head from "next/head";
import Image from "next/image";
import Dream_generator_main from "@/components/dream_generator_main";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Head>
          <title>
            Dream Generator by OpenAI
          </title>
          <meta
            name="description"
            content="Dream your dream again"
          />
          <link rel="icon" href="/dreamer_logo.ico" />
        </Head>

        <Dream_generator_main />

      </main>
    
    </div>
  );
}
