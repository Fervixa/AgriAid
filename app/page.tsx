import React from "react";
import { About } from "@/components/about";
import { Home } from "@/components/home";
import { Contact } from "@/components/contact";
import { Ourgoal } from "@/components/ourgoal";
import Footer from "@/components/footer";

export default function page() {
  return (
    <div>
      <Home />
      <About />
      <Ourgoal />
      <Contact />
      <Footer />
    </div>
  );
};