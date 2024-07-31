"use client";

import { useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchContainer } from "../../redux/slice/container.slice";
import CardContainerComponent from "./CardContainer";

const WrapperListContainer = () => {
  const dispatch: AppDispatch = useDispatch();

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
      <div
        className="w-full overflow-y-auto flex justify-center"
        style={{ height: "calc(100svh - 70px)" }}
      >
        <div className="w-full h-fit md:w-3/5 p-3 md:p-4 mb-16 sm:mb-20">
          {containers.map((container, i) => (
            <CardContainerComponent key={i} container={container} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WrapperListContainer;
