'use client'
import { HiArrowUpRight } from "react-icons/hi2";

export default function Home() {
  return (
    <>
      <section className="mx-auto my-6 w-[90vw] h-[700px] rounded-xl relative overflow-hidden text-white">
        <div className="absolute w-80 h-6 bg-white top-0 left-[39%] rounded-b-xl z-10"></div>
        <div className="absolute w-50 h-6 bg-white rounded-t-xl left-[20%] bottom-0 z-10"></div>
        <div className="absolute w-50 h-6 bg-white rounded-t-xl right-[20%] bottom-0 z-10"></div>
        <div className="bg-[url('/herobanner.avif')] bg-no-repeat bg-cover w-full h-full ">
          <div className="cover w-full h-full bg-black opacity-50 flex flex-col justify-center">
            <div className="hero_text mx-10 w-[40%] relative-z-10 p-5">
              <h1 className="font-semibold text-6xl my-5">SHAPING A NEW ERA OF STYLE AND SOPHISTICATION</h1>
              <p className="w-[60%]">Elevate your wardrobe and embrace your unique elegance with every cick.</p>
            </div>
            <div className="button mx-10 px-5 py-2.5">
              <button className="border border-white px-8 py-4 rounded-full flex justify-center items-center gap-2">
                <p className="font-semibold">SEE COLLECTION</p>
                <HiArrowUpRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}