import React from "react";

// Group layout: defer to root layout for shared UI (Navbar, ThemeProvider)
const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default LandingPageLayout;
