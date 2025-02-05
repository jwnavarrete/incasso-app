import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["app.localhost", "localhost", "auth.localhost"],
  },

  // otras opciones de configuración
};

export default nextConfig;
