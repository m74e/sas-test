"use client";

import Image from "next/image";
import Link from "next/link";
import { aclonica } from "@/lib/utils";

export default function MainPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/mainPage.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>

      {/* Left & right frame (loginL, loginR) */}
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

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-20">
        {/* Header: logo, nav, LOGIN button */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#FF62FC]/30 pb-4">
          <Image
            src="/icon.png"
            alt="Excellence"
            width={200}
            height={32}
            className="object-contain object-left"
          />
          <nav className="flex items-center gap-8">
            <a
              href="#about"
              className={`text-sm uppercase tracking-wider text-white/90 transition hover:text-[#FF62FC] ${aclonica.className}`}
            >
              ABOUT
            </a>
            <a
              href="#sponsor"
              className={`text-sm uppercase tracking-wider text-white/90 transition hover:text-[#FF62FC] ${aclonica.className}`}
            >
              SPONSOR
            </a>
            <Link
              href="/login"
              className={`rounded-lg border border-[#FF62FC] bg-[#FF62FC]/20 px-5 py-2.5 text-sm uppercase tracking-wider text-white transition hover:bg-[#FF62FC]/40 ${aclonica.className}`}
            >
              LOGIN
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="mt-16 text-center">
          <h1
            className={`bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-4xl font-bold uppercase tracking-widest text-transparent md:text-5xl lg:text-6xl ${aclonica.className}`}
          >
            ONE DAY OF REAL COMPETITION
          </h1>
          <p className={`mx-auto mt-4 max-w-xl text-lg text-white/90 ${aclonica.className}`}>
            A quick experience, real pressure, and immediate results
          </p>
        </section>

        {/* ABOUT */}
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
    </main>
  );
}
