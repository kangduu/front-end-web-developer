import { useReducer, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { RouterType } from "../../routers/route";
import Logo from "../../assets/typescript.svg";
import { sidebarRoutes } from "../../routers/index";
import styles from "./styles.module.scss";

const RootNames: string[] = Object.keys(sidebarRoutes);

// useReducer
interface IState {
  active: string[];
  activePath: string;
}
interface IAction {
  type: string;
  payload: string;
}
function init(pathname: string): IState {
  let active = [],
    activePath = "";
  for (let i = 0; i < RootNames.length; i++) {
    const route = sidebarRoutes[RootNames[i]];
    if (route.find((item) => pathname === item.path)) {
      activePath = pathname;
      active.push(RootNames[i]);
      break;
    }
  }
  return { active, activePath };
}
function reducer(state: IState, action: IAction): IState | never {
  switch (action.type) {
    case "setOneActive":
      return { ...state, active: [action.payload] };
    case "setActive":
      if (state.active.includes(action.payload)) {
        return {
          ...state,
          active: state.active.filter((item) => item !== action.payload),
        };
      } else {
        return { ...state, active: [...state.active, action.payload] };
      }
    case "setActivePath":
      return { ...state, activePath: action.payload };
    default:
      throw new Error();
  }
}

const NavBar: FC<any> = () => {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, init(location.pathname));

  if (RootNames.length === 0) return null;
  return (
    <>
      <div className={styles["nav-logo"]}>
        <img src={Logo} alt="" />
        <span>TypeScript</span>
      </div>
      <ul>
        {RootNames.map((rootName: string) => {
          const route = sidebarRoutes[rootName];
          const isActive = state.active.indexOf(rootName) > -1;
          return (
            <li
              key={rootName}
              className={
                styles["nav-list-item"] +
                " " +
                (isActive ? styles["active"] : "")
              }
            >
              <div
                className={styles["item-btn"]}
                onClick={() =>
                  dispatch({ type: "setActive", payload: rootName })
                }
              >
                <span>{rootName}</span>

                <svg
                  fill="none"
                  height={isActive ? 9 : 14}
                  viewBox={isActive ? "0 0 14 9" : "0 0 9 14"}
                  width={isActive ? 14 : 9}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={isActive ? "m1 1 6 6 6-6" : "m1 13 6-6-6-6"}
                    stroke={
                      isActive &&
                      route.find((item) => item.path === state.activePath)
                        ? "#3178c6"
                        : "#000"
                    }
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <ul
                className={
                  styles.collapsed +
                  " " +
                  (isActive ? styles["collapsed-show"] : "")
                }
              >
                {route.map((item: RouterType) => {
                  const { path, name } = item;
                  return (
                    <li
                      key={path}
                      className={styles["route-item"]}
                      onClick={() => {
                        dispatch({ type: "setActivePath", payload: path });
                        dispatch({ type: "setOneActive", payload: rootName });
                      }}
                    >
                      <Link
                        to={path}
                        className={
                          state.activePath === path
                            ? styles["route-item-active"]
                            : ""
                        }
                        // TODO children
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default NavBar;
