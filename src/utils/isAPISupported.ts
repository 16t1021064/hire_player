export const isAPISupported = (api: any) => {
  return typeof window !== "undefined" ? api in window : false;
};
