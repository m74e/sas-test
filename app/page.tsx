"use client";

import Image from "next/image";
import Link from "next/link";
import { aclonica } from "@/lib/utils";
import { StarsBackground } from "@/components/stars-background";

const BACKGROUND_HEIGHT = "180vh";

export default function MainPage() {
  return (
    <main className="relative min-h-screen bg-[#FF62FC] text-white">
      <section
        className="relative w-full"
        style={{ minHeight: BACKGROUND_HEIGHT }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/mainPage.png"
            alt=""
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <StarsBackground scrollWithPage />
          <div className="absolute inset-0 bg-black/40" aria-hidden />
        </div>

        <Image
          src="/loginL.png"
          alt=""
          width={100}
          height={75}
          className="pointer-events-none fixed left-0 top-0 z-20"
        />
        <Image
          src="/loginR.png"
          alt=""
          width={100}
          height={75}
          className="pointer-events-none fixed right-0 top-0 z-20"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-20">
          <header className="flex flex-wrap items-center justify-between gap-6 pt-4 pb-4 mt-16">
            <Image
              src="/logo.png"
              alt="Excellence"
              width={200}
              height={32}
              className="object-contain object-left"
            />
            <nav className="flex items-center gap-10 font-spot-light">
              <a href="#about" className="text-white hover:text-[#E9A3FB] transition-colors">ABOUT</a>
              <Image className="mb-[20px]" src="/nav.png" alt="nav" width={72} height={12} />
              <a href="#sponsor" className="text-white hover:text-[#E9A3FB] transition-colors">SPONSOR</a>
              <Image className="mb-[20px]" src="/nav.png" alt="nav" width={72} height={12} />
              <a href="/login" className="text-white hover:text-[#E9A3FB] transition-colors">login</a>
              <Link
                href="/login"
                className="rounded-full bg-gradient-to-r from-[#F0CDFC] to-[#CD95E0] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] transition hover:from-[#D8B4FE] hover:to-[#C084FC] hover:shadow-[0_0_16px_rgba(168,85,247,0.5)]"
              >
                LOGIN
              </Link>
            </nav>
          </header>

          <section className="mt-16 text-center flex flex-col items-center justify-center">
            <h1
              className={`bg-gradient-to-r from-[#FF62FC] to-[#12AAC2] bg-clip-text text-4xl font-bold uppercase tracking-widest text-transparent md:text-5xl lg:text-6xl ${aclonica.className}`}
            >
              ONE DAY OF REAL COMPETITION
            </h1>
            <div className="relative mx-auto mt-10 w-full max-w-2xl">
              <Image
                src="/between.png"
                alt=""
                width={800}
                height={120}
                className="w-full object-contain"
              />
              <p
                className={`absolute inset-0 flex items-center justify-center px-6 text-center text-lg text-white/90 ${aclonica.className}`}
              >
                A quick experience, real pressure, and immediate results
              </p>
            </div>
            <Image src="/footer.png" alt="about" width={1000} height={1000} />
          </section>
          <Image className="fixed right-0" src="/Artwork.png" alt="about" width={600} height={700} />
          <section id="about" className="mt-24 scroll-mt-24">
            <h2
              className={`border-b-4 border-[#FF62FC] pb-2 text-3xl uppercase tracking-wider text-white ${aclonica.className}`}
            >
              ABOUT
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/90">
              A one-day competitive programming event aimed at first-year students
              interested in programming from various universities, based on solving
              programming questions within a specific time and in a way that
              measures thinking and logic.
            </p>
            <p
              className={`mt-6 text-2xl tracking-[0.4em] text-white/80 ${aclonica.className}`}
            >
              &lt;&lt;&lt;&lt;&lt;&lt;
            </p>
            <p className={`mt-2 text-lg uppercase tracking-widest text-white ${aclonica.className}`}>
              ON 2026/2/5
            </p>
          </section>

          <section id="sponsor" className="mt-24 scroll-mt-24">
            <h2
              className={`border-b-4 border-[#FF62FC] pb-2 text-3xl uppercase tracking-wider text-white ${aclonica.className}`}
            >
              SPONSOR
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/90">
              Sponsor section — coming soon.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
