"use client";

import { useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchContainer } from "@/redux/slice/container.slice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CardContainerComponent from "./CardContainer";

const WrapperListContainer = () => {
  const dispatch: AppDispatch = useDispatch();

  const [parent] = useAutoAnimate();

  useEffect(() => {
    dispatch(fetchContainer());
  }, [dispatch]);

  const { containers, status, error } = useSelector(
    (state: RootState) => state.container
  );

  if (status === "loading" || status === "idle")
    return (
      <div className="w-full h-calc-screen-minus-160 flex justify-center items-center">
        <CircularProgress label="Loading..." />
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
