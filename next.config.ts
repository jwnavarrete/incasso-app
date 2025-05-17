import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/:path*`, // Redirigir las solicitudes externas a tu backend
      },
      {
        source: "/api/:path*",
        destination: "/api/:path*", // Deja que Next.js maneje las solicitudes internas
      },
    ];
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`, // Permite los subdominios
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true", // Permite enviar cookies entre subdominios
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // Métodos que permites
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization", // Permite los encabezados adecuados
          },
        ],
      },
    ];
  }
};

export default nextConfig;