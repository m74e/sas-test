import Image from "next/image";
import React from "react";
import { Aclonica } from "next/font/google";

const aclonica = Aclonica({
  subsets: ["latin"],
  weight: "400",
});

const loginPage = () => {
  return (
    <>
      <header className="flex justify-between items-center ">
        <Image src="/header.png" alt="logo" width={800} height={418.53} />
        <Image src="/headerR.png" alt="logo" width={800} height={418.53} />
      </header>
      <main>
        <Image
          className="fixed left-0 top-0"
          src="/loginL.png"
          alt="loginL"
          width={100}
          height={74.97}
        />

        <Image
          className="fixed right-0 top-0"
          src="/loginR.png"
          alt="loginR"
          width={100}
          height={74.97}
        />
        <div className="px-[46px] pt-[45px] w-full">
          <Image
            className="pl-8"
            src="/logo.png"
            alt="logo"
            width={280.74}
            height={28.24}
          />
          <div className="flex flex-col justify-center items-center">
            <h2
              className={`text-4xl text-center text-[#FF62FC] ${aclonica.className}`}
            >
              LOGIN
            </h2>
            <div className="flex flex-col gap-5 mt-6">
                <p></p>
              <input
                className="w-[380px] h-[77px] border border-[#E9A3FB] rounded-md p-2 outline-none"
                type="text"
              />
                <p></p>
              <input
                className="w-[380px] h-[77px] border border-[#E9A3FB] rounded-md p-2 outline-none"
                type="text"
              />
            </div>
            <div className="mt-12">
              <button
                className={`w-[380px] text-2xl text-center h-[77px] bg-[#00B8D5] text-white rounded-md p-2 ${aclonica.className}`}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex justify-center items-center">
        <Image
          className="fixed bottom-0"
          src="/footer.png"
          alt="logo"
          width={1710}
          height={418.53}
        />
      </footer>
    </>
  );
};

export default loginPage;
