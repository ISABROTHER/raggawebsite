// src/data/locations.ts

export interface LocationData {
  zone: string;
  assemblyman: string;
  phone: string;
  communities: string[];
  photoUrl: string; // Added photo field
}

// Placeholder image (Ghana Flag as requested)
const GHANA_FLAG = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/640px-Flag_of_Ghana.svg.png";

export const LOCATIONS: LocationData[] = [
  {
    zone: "Ankaful",
    assemblyman: "George Anafo",
    phone: "+233 54 648 8474",
    communities: [
      "Ankaful",
      "Ankaful Camp",
      "Nanabakrom",
      "Taedo",
      "Fadur",
      "Dankwaakrom"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Mpeasem / Brimso",
    assemblyman: "David Owu",
    phone: "+233 27 805 5284",
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
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Koforidua / Nyinasin",
    assemblyman: "Paul Nat Amissah",
    phone: "+233 24 393 0021",
    communities: [
      "Koforidua",
      "Nyinasin",
      "Amoyaw",
      "Esuekyir Community 1",
      "Esuekyir Estates"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Efutu / Mampong",
    assemblyman: "Alhaji M. Abdullha",
    phone: "+233 24 470 7883",
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
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Adisadel",
    assemblyman: "Muntala Mohammed",
    phone: "+233 24 327 8820",
    communities: [
      "Adisadel Village",
      "Adisadel College",
      "Adisadel Staff Quarters",
      "West Adisadel",
      "Zongo (Adisadel Zongo)",
      "Tsibu Darko (Adisadel edge)",
      "Estates",
      "Tankoferdo"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Tsibi Darko",
    assemblyman: "Husseni Shaibu",
    phone: "+233 24 346 2446",
    communities: [
      "Tsibu Darko",
      "Estate extensions around Adisadel",
      "Ridge fringe areas"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Blackstar",
    assemblyman: "Isaac Winful",
    phone: "+233 24 944 7006",
    communities: [
      "Black Star (MOH) Bungalows",
      "Augusto Bungalows",
      "SSNIT Flats",
      "Ola University Area (extensions)"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Ola Low Cost",
    assemblyman: "Tsibu-Darko Prince",
    phone: "+233 24 427 4461",
    communities: [
      "Ola Low Cost",
      "Ola Medina (overlap area)",
      "North Ola",
      "Ola Market area"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Ola Madina",
    assemblyman: "Samuel E. Krah",
    phone: "+233 24 326 8939",
    communities: [
      "Ola Madina",
      "Ola Central Community",
      "University enclave transition zones"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "3rd Ridge / Nkanfoa",
    assemblyman: "Frederick J.T. Mensah",
    phone: "+233 24 661 6651",
    communities: [
      "1st Ridge",
      "2nd Ridge",
      "3rd Ridge",
      "4th Ridge",
      "Nkafoa",
      "Nkafoa Nkamadze",
      "Nkafoa Beseadze"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Pedu Nguabado",
    assemblyman: "Isaac Kobina Mensah",
    phone: "+233 54 990 2118",
    communities: [
      "Pedu",
      "Pedu Junction",
      "Nguabado",
      "Adaaso",
      "Mintsiminim (Nurses Flats)",
      "Buwano"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Pedu Abakadze",
    assemblyman: "James Arthur",
    phone: "+233 24 848 3321",
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
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Abakam / Aheneboboi",
    assemblyman: "Wisdom Suka",
    phone: "+233 24 253 2998",
    communities: [
      "Abakam",
      "Ahenboboe",
      "Kokwaado (nearby cluster)"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "University Old Site / Apewosika",
    assemblyman: "Francis Mensah Egyir",
    phone: "+233 20 033 8167",
    communities: [
      "University Old Site",
      "Apewosika",
      "Akotokyir",
      "Duakor",
      "Ahenboboe boundary",
      "Amamoma (shared with New Site)"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "University New Site / Kwaprow",
    assemblyman: "John Kilson Mensah",
    phone: "+233 54 821 4411",
    communities: [
      "University New Site",
      "Kwaprow",
      "Kwesipra",
      "Amamoma",
      "Kokwaado edges"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Nkwantado / Assim",
    assemblyman: "Moses Arthur",
    phone: "+233 24 650 5955",
    communities: [
      "Nkwantado",
      "Assim",
      "Ba Awar",
      "Adeebikrom",
      "Roman Hill area",
      "Abota Yie"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Etsifi / Eyifua",
    assemblyman: "Abdul Malik Adjei",
    phone: "+233 24 403 1098",
    communities: [
      "Eyifua",
      "Eyifua Estates",
      "Etsifi",
      "Abura Estate (shared boundary)",
      "Aba Anwonakrom"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Kakomdo",
    assemblyman: "Usman Egyin Abbam",
    phone: "+233 24 451 8779",
    communities: [
      "Kakomdo",
      "Amisano",
      "Ebubonko",
      "C-Poly (CCTU area)",
      "Zongo (shared boundary)"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Ebubonko / Amissano",
    assemblyman: "Kobina Issah",
    phone: "+233 24 569 4631",
    communities: [
      "Ebubonko",
      "Amissano",
      "Dehia",
      "Kramotawia"
    ],
    photoUrl: GHANA_FLAG
  },
  {
    zone: "Essuekyir",
    assemblyman: "Benjamin Manso",
    phone: "+233 55 510 6104",
    communities: [
      "Esuekyir",
      "Anto Esuekyir",
      "Esuekyir Estates",
      "Esuekyir Community 1",
      "Amoyaw",
      "Nyinasin edges"
    ],
    photoUrl: GHANA_FLAG
  }
];