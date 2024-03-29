import React from "react";
import Timer from "../timer/Timer";
import useTranslate from "../hooks/useTranslate";
import { Link, NavLink } from "react-router-dom";
import Username from "./username/Username";
import { useSelector } from "../hooks/useSelector";
import { useActions } from "../hooks/useActions";

import "./Header.scss";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import { ReactComponent as LoginIcon } from "../../assets/login.svg";

const getLinks = (logged: boolean) => [
  { url: "/registration", text: "Registration" },
  { url: "/posts", text: "Posts" },
  ...(!logged ? [] : [{ url: "/myposts", text: "My Posts" }]),
];

const Header: React.FC = () => {
  const { lang, setLang } = useTranslate();
  const logged = useSelector((state) => state.auth.logged);
  const { logout } = useActions();
  const links = getLinks(logged);

  const handleLogout = () => {
    logout();
  };

  //const toggleLanguage = () => {
  //  setLang((prevValue: string) => (prevValue === "en" ? "ru" : "en"));
  //};

  return (
    <nav className="header-container">
      <div className="logo">
        {/* <LogoIcon /> */}

        <div className="app-name">Blog Online</div>
      </div>

      <ul className="links">
        {links.map(({ url, text }) => (
          <li key={url + text}>
            <NavLink to={url} className={({ isActive }) => (isActive ? "_active" : "")}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="controls">
        {logged ? (
          <>
            <Username />
            <LogoutIcon className="icon-button logout-button" onClick={handleLogout} />
          </>
        ) : (
          <Link to="/login">
            <LoginIcon className="icon-button logout-button" onClick={handleLogout} />
          </Link>
        )}

        <Timer />
        {lang === "en" ? (
          <button onClick={() => setLang("ru")}>ru</button>
        ) : (
          <button onClick={() => setLang("en")}>en</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
