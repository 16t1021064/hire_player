import FontFaceObserver from "fontfaceobserver";
import { useLayoutEffect, useState } from "react";

const exo2Observer = new FontFaceObserver("Exo_2", {});
const poppinsObserver = new FontFaceObserver("Poppins", {});

const timeout = 5000; // miliseconds

export default function useFontObserver() {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    Promise.all([
      exo2Observer.load(null, timeout),
      poppinsObserver.load(null, timeout),
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
