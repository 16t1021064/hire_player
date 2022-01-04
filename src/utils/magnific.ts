export const openPopup = (target: any) => {
  const w = window as any;
  w.jQuery.magnificPopup.open({
    mainClass: "mfp-zoom-in",
    items: {
      src: target,
      type: "inline",
      fixedContentPos: true,
      removalDelay: 200,
    },
  });
};
