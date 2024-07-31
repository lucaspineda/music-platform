import React, { FC } from "react";
import Header from "./Header";
import { Song } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  songs?: Song[];
}
const Layout: FC<LayoutProps> = ({ children, songs }) => {
  return (
    <>
      <Header songs={songs} />
      {children}
    </>
  );
};

export default Layout;
