import ICON from "src/assets/typescript.svg";
import { NavigationType } from "src/types/navigation";

import GetStarted from "./get-started";
import Handbook from "./handbook";

const TypeScript: NavigationType = {
  icon: () => ICON,
  name: "TypeScript",
  children: [
    {
      name: "Get Started",
      children: GetStarted,
    },
    {
      name: "Handbook",
      children: Handbook,
    },
  ],
};

export default TypeScript;
