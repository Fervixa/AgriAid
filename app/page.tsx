import React from "react";
import Navbar from "./components/navbar";
import { About } from "./components/about";
import { Home } from "./components/home";
import { Contact } from "./components/contact";
import { Ourgoal } from "./components/ourgoal";
import Footer from "./components/footer";

export default function page() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Ourgoal />
      <Contact />
      <Footer />
    </div>
  );
};