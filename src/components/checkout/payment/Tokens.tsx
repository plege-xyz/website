import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCheckout } from "../Context";

const Token = () => {
  const { tokens } = useCheckout();

  return (
    <div className="w-full flex flex-col gap-y-2">
      {tokens ? (
        tokens.map(({ image, symbol, amount, mint }, key) => {
          // render multiple tokens with same mint as a single token and add up the amount
          const tokenIndex = tokens.findIndex((t) => t.mint === mint);
          if (tokenIndex !== key) return null;

          return (
            <div
              key={key}
              className="w-full h-14 bg-[#fff] dark:bg-[rgb(20,20,20)] border-[2px] gap-x-8 border-[#222] shadow-xl shadow-[rgb(10,10,10)] items-center rounded flex justify-between"
            >
              <div className="pl-3 flex items-center">
                <img src={image} alt="" className="w-8 h-w-8" />
                <h3 className="pl-3 shapiro text-xl">{symbol}</h3>
              </div>
              <div
                className={`mr-3 ${
                  !amount
                    ? "rounded h-6 w-16 animate-pulse bg-[rgb(30,30,30)]"
                    : "shapiro text-lg text-gray-400"
                }`}
              >
                {tokens
                  .filter((t) => t.mint === mint)
                  .reduce((acc, cur) => acc + cur.amount, 0)}
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full h-14 bg-[#fff] dark:bg-[rgb(20,20,20)] border-[2px] gap-x-8 border-[#222] shadow-xl shadow-[rgb(10,10,10)] items-center rounded flex justify-between">
          <div className="pl-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[rgb(30,30,30)] animate-pulse"></div>
            <div className="ml-3 w-16 h-6 rounded bg-[rgb(30,30,30)] animate-pulse"></div>
          </div>
          <div className="mr-3 rounded h-6 w-16 animate-pulse bg-[rgb(30,30,30)]"></div>
        </div>
      )}
    </div>
  );
};

export default Token;
