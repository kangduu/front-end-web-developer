import { FC } from "react";
import LogoIcon from "../../assets/typescript.svg";
import styles from "./styles.module.scss";

const Logo: FC<any> = () => {
  return (
    <div className={styles.logo}>
      <img src={LogoIcon} alt="" />
      <span>TypeScript</span>
    </div>
  );
};

export default Logo;
