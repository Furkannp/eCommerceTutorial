/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import Sidebar from "./Sidebar";
import { withTranslation } from "react-i18next";
import { Badge } from "@mui/material";

const PrivateRoute = ({ children, i18n }) => {
  const user = localStorage.getItem("token");

  useEffect(() => {
    if (
      !(
        localStorage.getItem("i18nextLng") === "tr" ||
        localStorage.getItem("i18nextLng") === "en"
      )
    ) {
      localStorage.setItem("i18nextLng", "tr");
    }
  }, []);

  const changeLanguage = (lang) => {
    localStorage.setItem("i18nextLng", lang);
    i18n.changeLanguage(lang);
  };
const currLang= localStorage.getItem("i18nextLng");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="App">
        <div className="layout">
          <div className="topbar text-center">
            <div
              className="d-flex h-100"
              style={{ alignItems: "center", justifyContent: "space-evenly" }}
            >
              <div>Simple E-Commerce WebSite</div>
            </div>
            <div
              style={{
                float: "right",
                top: "-43px",
                position: "relative",
                right: "10px",
              }}
            >
              <ButtonGroup>
                <Button color="light" disabled={currLang === "tr"} onClick={() => changeLanguage("tr")}>
                  <Badge variant="dot" color="success" invisible={currLang === "en"}>
                    TR
                  </Badge>
                </Button>
                <Button color="light" disabled={currLang === "en"} onClick={() => changeLanguage("en")}>
                <Badge variant="dot" color="success" invisible={currLang === "tr"}>
                    EN
                  </Badge>
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="mainContainer">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default withTranslation("common")(PrivateRoute);
