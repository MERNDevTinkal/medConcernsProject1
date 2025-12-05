import React from "react";
import { Link } from "react-router-dom";
import {
  icon01,
  icon02,
  icon03,
  icon04,
  icon05,
} from "../../../Component/DiseasesData/images"

const Footer = () => {
  return (
    <>
      <div className="thm-footer fixed bottom-0 left-0 right-0">
        <div className="py-2 px-5 mx-auto thm-footer-innr">
          <ul className="flex md:gap-30 sm:gap-5 justify-around">
            <li>
              <Link to="/yes-no-concerns">
                <img src={icon01} />
              </Link>
            </li>
            <li>
              <Link to="/board">
                <img src={icon02} />
              </Link>
            </li>
            <li>
              <Link to="/concern">
                <img src={icon03} />
              </Link>
            </li>
            <li>
              <Link to="/feeling">
                <img src={icon04} />
              </Link>
            </li>
            <li>
              <Link to="/whiteboard">
                <img src={icon05} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
