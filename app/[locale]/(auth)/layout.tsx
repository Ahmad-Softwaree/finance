import Breadcrumbs from "@/components/layouts/breadcrumbs";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-10 space-y-5">
      <Breadcrumbs />
      {children}
    </div>
  );
};

export default layout;
