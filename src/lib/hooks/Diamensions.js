import { useMediaQuery } from "react-responsive";

export const isDesktop = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return isDesktop;
};

export const isMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile;
};

export const isTablet = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  return isTablet;
};
