// import Image from "next/image";
// import { Inter } from 'next/font/google'
// import video from "@/app/fonts/video.mp4";

import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";

export default function Home() {
  return (
    <>
 
        <Signup />
        <Login />
        <Dashboard />

    </>
  );
}
