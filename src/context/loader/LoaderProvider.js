import { useContext, useState } from "react";

import LoaderContext from "./LoaderContext";

export function useLoader() {
  return useContext(LoaderContext);
}

const LoaderProvider = (props) => {
  const state = false;

  const [loader, setLoader] = useState(state);

  const startLoader = () => {
    setLoader(true);
  };

  const stopLoader = () => {
    setLoader(false);
  };

  return (
    <LoaderContext.Provider value={{ loader, startLoader, stopLoader }}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
