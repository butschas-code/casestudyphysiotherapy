import { PhysiotherapyClient } from "./PhysiotherapyClient";

export const metadata = {
  title: "KUSTĪBA — Human-Centred Physiotherapy Website Concept | Saiteo",
  description: "An independent Saiteo concept exploring how a warm, human physiotherapy website can build trust, help patients recognise their needs and make booking easier.",
  openGraph: {
    title: "KUSTĪBA — Human-Centred Physiotherapy Website Concept | Saiteo",
    description: "An independent Saiteo concept exploring how a warm, human physiotherapy website can build trust, help patients recognise their needs and make booking easier.",
    images: [{ url: "https://saiteo.com/portfolio/physiotherapy-concept.webp", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <PhysiotherapyClient locale="lv" />;
}

