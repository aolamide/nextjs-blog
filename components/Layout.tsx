import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="py-0 px-8">{props.children}</div>
    <style jsx global>{`
      body {
        background: rgba(0, 0, 0, 0.05);
      }
 
    `}</style>
  </div>
);

export default Layout;
