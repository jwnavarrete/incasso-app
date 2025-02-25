"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppTheme from "@/theme/AppTheme";
import AppAppBar from "@/common/components/landing/AppAppBar";
import Hero from "@/common/components/landing/Hero";
import LogoCollection from "@/common/components/landing/LogoCollection";
import Highlights from "@/common/components/landing/Highlights";
import Pricing from "@/common/components/landing/Pricing";
import Features from "@/common/components/landing/Features";
import Testimonials from "@/common/components/landing/Testimonials";
import FAQ from "@/common/components/landing/FAQ";
import Footer from "@/common/components/landing/Footer";

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
