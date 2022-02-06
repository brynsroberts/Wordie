import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { IoStatsChartSharp } from "react-icons/io5";

import "./Header.css";

function Header() {
  return (
    <Navbar id="navbar">
      <Container>
        <Navbar.Collapse className="justify-content-left">
          <Navbar.Text>
            <AiOutlineQuestionCircle />
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text id="title">
            <b>WORDIE</b>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <IoStatsChartSharp />
            <IoMdSettings id="settingsIcon" />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
