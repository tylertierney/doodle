import camel from "../../assets/svg/camel.svg";
import deer from "../../assets/svg/deer.svg";
import dog from "../../assets/svg/dog.svg";
import elephant from "../../assets/svg/elephant.svg";
import gorilla from "../../assets/svg/gorilla.svg";
import hippo from "../../assets/svg/hippo.svg";
import koala from "../../assets/svg/koala.svg";
import lion from "../../assets/svg/lion.svg";
import panda from "../../assets/svg/panda.svg";
import pig from "../../assets/svg/pig.svg";
import rhino from "../../assets/svg/rhino.svg";
import tiger from "../../assets/svg/tiger.svg";
import zebra from "../../assets/svg/zebra.svg";

export interface CharacterObj {
  name: string;
  icon: string;
  color: string;
  isSelected: boolean;
}

export const characters = [
  { name: "camel", icon: camel, color: "lightgreen", isSelected: true },
  { name: "deer", icon: deer, color: "#afbff2", isSelected: false },
  { name: "dog", icon: dog, color: "#aff2af", isSelected: false },
  { name: "elephant", icon: elephant, color: "#aff2e8", isSelected: false },
  { name: "gorilla", icon: gorilla, color: "#f2afd9", isSelected: false },
  { name: "hippo", icon: hippo, color: "#d9aff2", isSelected: false },
  { name: "koala", icon: koala, color: "#fcfba2", isSelected: false },
  { name: "lion", icon: lion, color: "#99ffce", isSelected: false },
  { name: "panda", icon: panda, color: "#ff99bc", isSelected: false },
  { name: "pig", icon: pig, color: "#cd99ff", isSelected: false },
  { name: "rhino", icon: rhino, color: "#fcc9a2", isSelected: false },
  { name: "tiger", icon: tiger, color: "#abf1ff", isSelected: false },
  { name: "zebra", icon: zebra, color: "#c9abff", isSelected: false },
];
