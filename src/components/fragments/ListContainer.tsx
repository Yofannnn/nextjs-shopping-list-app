"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CardContainerComponent from "./CardContainer";

const WrapperListContainer = () => {
  const [parent] = useAutoAnimate();

  const { containers, status, error } = useSelector(
    (state: RootState) => state.container
  );

  if (status === "loading" || status === "idle")
    return (
      <div className="w-full h-calc-screen-minus-160 flex justify-center items-center">
        <h2 className="text-3xl">Loading...</h2>
      </div>
    );

  if (status === "failed")
    return (
      <div className="w-full h-calc-screen-minus-160 flex justify-center items-center">
        <h2 className="text-3xl">Error : {error}</h2>
      </div>
    );

  return (
    <>
      <div className="w-full flex justify-center">
        <div ref={parent} className="w-full md:w-3/5 p-3 md:p-4 mb-4">
          {containers.map((container, i) => (
            <CardContainerComponent key={i} container={container} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WrapperListContainer;
