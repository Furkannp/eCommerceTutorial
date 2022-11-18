/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { withTranslation } from 'react-i18next';


const Sidebar = ({ t }) => {
  const cartData = useSelector(state => state.cartData)
  return (
    <div>
      <ul className="p-0 text-center" style={{ listStyle: "none" }}>
        <li className="px-2 py-4">
          <Link to="/cart">
            <div>
              <Badge badgeContent={cartData?.data?.length > 0 ? cartData?.data?.length : 0} color="primary">
                <ShoppingBasketIcon style={{ fontSize: "64px" }} />
              </Badge>
              <br />
              {(t('sidebar.cart'))}
            </div>
          </Link>
        </li>
        <hr />
        <li className="px-2 py-4" style={{ fontSize: "18px" }}>
          <Link to="/">
            <b>{(t('sidebar.products'))}</b>
          </Link>
        </li>
        <li className="px-2 py-4" style={{ fontSize: "18px" }}>
          <Link to="/addNew">
            <b>{(t('sidebar.addNewProduct'))}</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default (withTranslation('common')(Sidebar));
