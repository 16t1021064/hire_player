import FontFaceObserver from "fontfaceobserver";
import { useLayoutEffect, useState } from "react";

const azoSansObserver = new FontFaceObserver("Azo Sans", {});
const avenirObserver = new FontFaceObserver("Avenir", {});

const timeout = 5000; // miliseconds

export default function useFontObserver() {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    Promise.all([
      azoSansObserver.load(null, timeout),
      avenirObserver.load(null, timeout),
    ])
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // even if font fail to load, we still need to allow render
        setLoaded(true);
      });
  }, []);

  return loaded;
}
