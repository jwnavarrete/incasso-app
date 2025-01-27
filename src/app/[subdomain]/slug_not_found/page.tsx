"use client";
import React from "react";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/auth/login_company");
    // router.push();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Page not found</h1>
      <p>
        You've somehow got to a non-existing page. Go to our Home Page in order
        to find what you are looking for :)
      </p>
      <button
        onClick={redirectToHome}
        style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default PageNotFound;
