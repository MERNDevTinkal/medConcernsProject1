import { Link, useLocation, matchPath } from "react-router-dom";
import {
  icon01,
  icon02,
  icon03,
  icon04,
  icon05,
} from "../../../Component/DiseasesData/images";

import React, { useEffect, useState } from "react";
import downarrow from "/assets/loaderGif/down-arrow.gif";

const Footer = () => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [hideOnScroll, setHideOnScroll] = useState(false);

  // Routes jahan icon hide hoga
  const hideOnPages = [
    "/pain-concern",
    "/feeling",
    "/introduction",
    "/whiteboard",
    "/howoften",
    "/depression-screener",
    "/feelOptions",
    "/yes-and-no",
    "/new-problem",
    "/yes-no",
    "/feeling-list-pain",
     "/concern-pain",
     "/rating-scale",
    // dynamic routes
    "/concern/:name/:id",
    "/confrm-step-when/:id",
    "/:name/confrm-step-yesno/:id",
    "/feelOptions/:id",
    "/board-upload/:id",
    "/yes-and-no/:id",
    "/topicboard/:name/:id",
  ];

  // Route based hide
  const hideByRoute = hideOnPages.some((path) =>
    matchPath({ path, end: false }, location.pathname),
  );

  // Scroll based hide
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldHideIcon = hideByRoute || hideOnScroll;

  return (
    <div
      className="thm-footer fixed left-0 right-0 bottom-0 z-50
      pb-[env(safe-area-inset-bottom)]"
    >
      <div className="py-2 px-5 mx-auto thm-footer-innr">
        <ul className="flex md:gap-30 sm:gap-5 justify-between">
          <li>
            <Link to="/yes-no">
              <img src={icon01} alt="Yes No" />
            </Link>
          </li>
          <li>
            <Link to="/board">
              <img src={icon02} alt="Board" />
            </Link>
          </li>
          <li>
            <Link to="/concern">
              <img src={icon03} alt="Concern" />
            </Link>
          </li>
          <li>
            <Link to="/feeling">
              <img src={icon04} alt="Feeling" />
            </Link>
          </li>
          <li>
            <Link to="/whiteboard">
              <img src={icon05} alt="Whiteboard" />
            </Link>
          </li>
        </ul>

        {!shouldHideIcon && (
          <div className="down-arrow">
            <img src={downarrow} alt="Down Arrow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
