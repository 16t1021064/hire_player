import { useEffect, useState } from "react";
import { isAPISupported } from "../utils/isAPISupported";

const errorMessage =
  "matchMedia is not supported, this could happen both because window.matchMedia is not supported by" +
  " your current browser or you're using the useMediaQuery hook whilst server side rendering.";

const useMediaQuery = (mediaQuery: string) => {
  if (!isAPISupported("matchMedia")) {
    console.warn(errorMessage);
    return false;
  }

  const [isVerified, setIsVerified] = useState(
    !!window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);

    documentChangeHandler();
    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
};

export default useMediaQuery;
