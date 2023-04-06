import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export function Main({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
