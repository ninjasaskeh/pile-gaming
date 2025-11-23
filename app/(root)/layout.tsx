import React from "react";

// Simplified layout: pages decide if they render Navbar.
const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default LandingPageLayout;
