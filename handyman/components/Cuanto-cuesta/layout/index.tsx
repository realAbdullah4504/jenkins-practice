import React from "react";
import HeroImage from "./HeroImage";
import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="Container">
        <Header />
      </header>
      <HeroImage />
      {children}
    </>
  );
};

export default Layout;
