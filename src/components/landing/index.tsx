"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "@/theme/ThemeProvider";
import AppAppBar from "@/components/landing/AppAppBar";
import Hero from "@/components/landing/Hero";

// export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
const LandingComponent: React.FC = (props: {
  disableCustomTheme?: boolean;
}) => {
  const [client, setClient] = React.useState(false);

  React.useEffect(() => {
    // Logic to load the client
    setClient(true);
    console.log("Client loaded");
  }, []);

  if (!client) {
    return null;
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      {/* <>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </>  */}
    </AppTheme>
  );
};

export default LandingComponent;
