import IonIcon from "@reacticons/ionicons";
import clsx from "clsx";
import { FC, MouseEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TMenu } from ".";

interface RendererProps {
  menu: TMenu;
}

const Renderer: FC<RendererProps> = ({ menu }) => {
  const [active, setActive] = useState<boolean>(false);
  const isParent = useMemo(() => {
    if (menu.subs && menu.subs.length > 0) {
      return true;
    } else {
      return false;
    }
  }, [menu]);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <li className={clsx("sidebar-item", active && "active")}>
      {isParent ? (
        <>
          <a className="sidebar-header" onClick={onClick}>
            <IonIcon
              className={`icon icon-${menu.icon}`}
              name={menu.icon as any}
            />
            <span>{menu.text}</span>
            <div className="icon-menu">
              <IonIcon
                className="icon icon-arrow-forward-outline"
                name="arrow-forward-outline"
              />
              <IonIcon
                className="icon icon-arrow-down-outline"
                name="arrow-down-outline"
              />
            </div>
          </a>
          <ul className={clsx("sidebar-submenu", active && "menu-open")}>
            {menu.subs?.map((sub, pos) => {
              return sub?.href ? (
                <li key={pos}>
                  <Link to={sub?.href}>{sub.text}</Link>
                </li>
              ) : undefined;
            })}
          </ul>
        </>
      ) : (
        <>
          {menu?.href && (
            <Link to={menu.href} className="sidebar-header">
              <IonIcon
                className={`icon icon-${menu.icon}`}
                name={menu.icon as any}
              />
              <span>{menu.text}</span>
            </Link>
          )}
        </>
      )}
    </li>
  );
};

export default Renderer;
