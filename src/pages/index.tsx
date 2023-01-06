/* eslint-disable @next/next/no-img-element */
import { circa, overpass } from "@/utils/fonts";

const Home = () => {
  return (
    <div
      className={`${circa} flex min-h-screen w-full flex-col items-center bg-black pt-40 text-center text-white`}
    >
      <div className="absolute top-10 flex gap-x-3">
        <a href="/discord" target="_blank" rel="noreferrer">
          <button className="h-10 w-10 rounded-full border border-white p-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
              <defs>
                <style>{`.cls-1{fill:#fff;}`}</style>
              </defs>
              <g id="图层_2" data-name="图层 2">
                <g id="Discord_Logos" data-name="Discord Logos">
                  <g
                    id="Discord_Logo_-_Large_-_White"
                    data-name="Discord Logo - Large - White"
                  >
                    <path
                      className="cls-1"
                      d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </a>
        <button
          className={`h-10 rounded-full px-5 pt-0.5 text-xs text-white ${overpass} border-separate border-spacing-1 border border-white`}
        >
          PRIVATE BETA
        </button>

        <a
          href="https://twitter.com/plege_xyz"
          target="_blank"
          rel="noreferrer"
        >
          <button className="h-10 w-10 rounded-full border border-white p-2.5">
            <svg
              version="1.1"
              id="Logo"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 248 204"
              xmlSpace="preserve"
            >
              <style type="text/css">{`.st0{fill:#FFFFFF;}`}</style>
              <g id="Logo_1_">
                <path
                  id="white_background"
                  className="st0"
                  d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"
                />
              </g>
            </svg>
          </button>
        </a>
      </div>
      <div className="text-8xl">
        recurring payments. <br /> subscriptions. <br /> saas. solana.
      </div>
      <div className={`${overpass} relative mt-20`}>
        <div className="flex h-12 w-max items-center justify-center">
          <div className="absolute -bottom-1.5 right-1.5 h-12 w-[9.5rem] rounded border border-white bg-[#222]"></div>

          <div
            className={`z-50 flex h-12 w-[9.5rem] cursor-pointer items-center justify-center rounded bg-white pt-0.5 text-sm text-black ${overpass} transition-all hover:-translate-x-1.5 hover:translate-y-1.5`}
          >
            EARLY ACCESS
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <img
          src="https://media.discordapp.net/attachments/947390920645554236/1060852040542208000/image.png"
          alt=""
          className="mt-24 -mb-6 rounded-xl border-4 border-[#111]"
        />
      </div>
    </div>
  );
};

export default Home;
