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
          <div className="flex justify-between">
            <div className="flex flex-col  justify-center"><Image src="/squer.png" alt="about" width={700} height={50} /></div>
            <div><Image src="/Artwork.png" alt="about" width={400} height={700} /></div>
          </div>
          <section id="about" className="relative mt-24 scroll-mt-24">
            <div className="about-title-wrap">
              <span className="about-title-line" aria-hidden />
              <h2
                className={`text-3xl font-bold uppercase tracking-wider text-white ${aclonica.className}`}
              >
                ABOUT
              </h2>
              <span className="about-title-line" aria-hidden />
            </div>
            <div className="about-circuit-frame mt-6 max-w-3xl">
              <p className="text-base leading-relaxed text-white/95 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
                A one-day competitive programming event aimed at first-year students
                interested in programming from various universities, based on solving
                programming questions within a specific time and in a way that
                measures thinking and logic.
              </p>
            </div>
            <div className="about-band" aria-hidden />
            <p
              className={`about-chevrons text-2xl ${aclonica.className}`}
              aria-hidden
            >
              &gt;&gt;&gt;&gt;&gt;&gt;
            </p>
            <p className={`mt-4 text-lg uppercase tracking-widest text-white ${aclonica.className}`}>
              ON 2026/2/5
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
