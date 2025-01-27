"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Langind from "./landing/page";

export default function Home() { 
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("http://localhost:3000/");
  // }, []);
  
  return <Langind />;
}
