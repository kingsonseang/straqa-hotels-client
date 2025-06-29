"use client";

import { BrowserRouter, Route, Routes } from "react-router";
import type { Organisation } from "@/validators/organisation";
import Footer from "./navigation/footer";
import Header from "./navigation/header";
import Book from "./pages/book";
import Home from "./pages/home";
import Property from "./pages/property";

interface AppProps {
  logo: string;
  organisation: Organisation;
}

export default function App({ logo, organisation }: AppProps) {
  return (
    <BrowserRouter>
      <Header logo={logo} organisation={organisation} />
      <Routes>
        <Route index element={<Home organisation={organisation} />} />
        <Route path="/p/:propertyId" element={<Property />} />
        <Route path="/p/:propertyId/book" element={<Book />} />
      </Routes>
      <Footer logo={logo} organisation={organisation} />
    </BrowserRouter>
  );
}
