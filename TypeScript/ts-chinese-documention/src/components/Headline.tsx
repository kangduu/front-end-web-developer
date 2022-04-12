import { FC } from "react";
const style = {
  fontSize: "3.5rem",
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: "3.5rem",
};
const Headline: FC<any> = (props: any) => {
  return <h2 style={style}>{props.children}</h2>;
};
export default Headline;
