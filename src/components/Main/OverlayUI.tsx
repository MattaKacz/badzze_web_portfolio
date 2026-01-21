import { useState } from "react";
import Navbar from "./Navbar";
import ConsultationPanel from "./ConsultationPanel";

export default function OverlayUI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar onConsultationClick={() => setIsOpen(true)} />
      <ConsultationPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
