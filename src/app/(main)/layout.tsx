import Header from "@/components/Header";
import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default MainLayout;
