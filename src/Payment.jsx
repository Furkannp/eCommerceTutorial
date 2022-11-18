/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { withTranslation } from "react-i18next";

const Payment = ({ t }) => {
  const cartItems = useSelector((state) => state.cartData.data);
  const initialValue = 0;
  const priceArr = cartItems.map((object) => object.price);
  const cartTotal = priceArr.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return (
    <div>
      <div className="mb-4 mt-2">
        <div style={{ color: "rgb(242, 122, 26)" }}>
          <span style={{ fontSize: "28px" }}>{t("payment.total")}: </span>
          <span style={{ fontSize: "32px" }}> {cartTotal.toFixed(2)} $</span> <br />
        </div>
      </div>
      <PaymentForm />
    </div>
  );
};
export default withTranslation("common")(Payment);
