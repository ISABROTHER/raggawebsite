// src/data/locations.ts

export interface LocationData {
  zone: string;
  assemblyman: string;
  phone: string;
  communities: string[];
  photoUrl: string; // Added photo field
}

// Updated placeholder image from user request
const ASSEMBLYMAN_PIC = "https://img.freepik.com/free-photo/business-woman-banner-concept-with-copy-space_23-2149601457.jpg?semt=ais_hybrid&w=740&q=80";

export const LOCATIONS: LocationData[] = [
  {
    zone: "3rd Ridge / Nkanfoa",
    assemblyman: "Benjamin Benyah",
    phone: "0243043906",
    communities: [
      "1st Ridge",
      "2nd Ridge",
      "3rd Ridge",
      "4th Ridge",
      "Nkafoa",
      "Nkafoa Nkamadze",
      "Nkafoa Beseadze"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Pedu Nguabado",
    assemblyman: "Isaac Kobina Mensah",
    phone: "0549902118",
    communities: [
      "Pedu",
      "Pedu Junction",
      "Nguabado",
      "Adaaso",
      "Mintsiminim (Nurses Flats)",
      "Buwano"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Pedu Abakadze",
    assemblyman: "James Arthur",
    phone: "0248483321",
    communities: [
      "Abakaadze",
      "Roman Hill",
      "Abota Yie",
      "Adeebikrom",
      "The Boy",
      "Tankokrom",
      "Ba Awar",
      "Nkwantado",
      "Assim"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Abakam / Aheneboboi",
    assemblyman: "Wisdom Suka",
    phone: "0242532998",
    communities: [
      "Abakam",
      "Ahenboboe",
      "Kokwaado (nearby cluster)"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "University Old Site / Apewosika",
    assemblyman: "Jacob Kakra Ewusie",
    phone: "0243563349",
    communities: [
      "University Old Site",
      "Apewosika",
      "Akotokyir",
      "Duakor",
      "Ahenboboe boundary",
      "Amamoma (shared with New Site)"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "University New Site / Kwaprow",
    assemblyman: "John Kilson Mensah",
    phone: "0548214411",
    communities: [
      "University New Site",
      "Kwaprow",
      "Kwesipra",
      "Amamoma",
      "Kokwaado edges"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Nkwantado / Assim",
    assemblyman: "Moses Arthur",
    phone: "0246505955",
    communities: [
      "Nkwantado",
      "Assim",
      "Ba Awar",
      "Adeebikrom",
      "Roman Hill area",
      "Abota Yie"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Etsifi / Eyifua",
    assemblyman: "Abdul Malik",
    phone: "0244031098",
    communities: [
      "Eyifua",
      "Eyifua Estates",
      "Etsifi",
      "Abura Estate (shared boundary)",
      "Aba Anwonakrom"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Kakomdo",
    assemblyman: "Vitus Rosevare Kobina Danquah",
    phone: "0244082362",
    communities: [
      "Kakomdo",
      "Amisano",
      "Ebubonko",
      "C-Poly (CCTU area)",
      "Zongo (shared boundary)"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Ebubonko / Amissano",
    assemblyman: "Ibrahim Dawda Mohammed",
    phone: "0548047421",
    communities: [
      "Ebubonko",
      "Amissano",
      "Dehia",
      "Kramotawia"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Essuekyir",
    assemblyman: "Eric Kofi Boateng",
    phone: "0595528417",
    communities: [
      "Esuekyir",
      "Anto Esuekyir",
      "Esuekyir Estates",
      "Esuekyir Community 1",
      "Amoyaw",
      "Nyinasin edges"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Ankaful",
    assemblyman: "Robert Mensah",
    phone: "0243344026",
    communities: [
      "Ankaful",
      "Ankaful Camp",
      "Nanabakrom",
      "Taedo",
      "Fadur",
      "Dankwaakrom"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Mpeasem / Brimso",
    assemblyman: "David Owu",
    phone: "0593098860",
    communities: [
      "Mpeasem",
      "Brimso",
      "Kyirakomfo",
      "Wenyi Ato",
      "Yayaakwano",
      "Akwakrom",
      "Pomanye",
      "Kumease",
      "Nyame Bekyere",
      "Akaikrom",
      "Akweikrom",
      "Besakrom"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Koforidua / Nyinasin",
    assemblyman: "Paul Nat Amissah",
    phone: "0243930021",
    communities: [
      "Koforidua",
      "Nyinasin",
      "Amoyaw",
      "Esuekyir Community 1",
      "Esuekyir Estates"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  },
  {
    zone: "Efutu / Mampong",
    assemblyman: "Alhaji Mustapha Abdullah",
    phone: "0244707883",
    communities: [
      "Efutu",
      "Efutu Ekutuadze",
      "Efutu Seguase",
      "Efutu Mampong",
      "Efutu Kokwaado",
      "Ewusikrom",
      "Ansapetu",
      "Nkokosa"
    ],
    photoUrl: ASSEMBLYMAN_PIC
  }
];