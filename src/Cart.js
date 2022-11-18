/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { cartActions } from "./redux/actions/cartActions";
import CustomTable from "./shared/components/CustomTable";
import { withTranslation } from "react-i18next";

const Cart = (props) => {
  const { cartItems, cartOperations, t } = props;
  const tableData = [];

  cartItems.forEach((element) => {
    if (tableData.some((e) => e.id === element.id)) {
      tableData.find((item) => item.id === element.id).quantity =
        tableData.find((item) => item.id === element.id).quantity + 1;
    } else {
      const elementWithQuantity = Object.assign(element, { quantity: 1 });
      tableData.push(elementWithQuantity);
    }
  });

  const addToCart = (data) => {
    cartOperations(data, "add");
  };
  const removeFromCart = (data) => {
    cartOperations(data, "remove");
  };
  const resetCart = () => {
    cartOperations(null, "removeAll");
  };
  const initialValue = 0;
  const priceArr = cartItems.map((object) => object.price);
  const cartTotal = priceArr.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return (
    <div>
      <CustomTable
        columns={[
          { title: t("cart.cartTable.columns.no"), field: "id" },
          { title: t("cart.cartTable.columns.image"), field: "image" },
          { title: t("cart.cartTable.columns.title"), field: "title" },
          { title: t("cart.cartTable.columns.category"), field: "category" },
          { title: t("cart.cartTable.columns.price"), field: "price" },
          { title: t("cart.cartTable.columns.quantity"), field: "quantity" },
          {
            title: t("cart.cartTable.columns.totalAmount"),
            field: "totalAmount",
          },
          { title: t("cart.cartTable.columns.actions"), field: "actions" },
        ]}
        customButtonBool
        customButtonText={t('cart.cartTable.removeAllFromCart')}
        customButtonOnClick={()=>{resetCart()}}
        cartActionsButtonsBool
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        data={tableData}
        title={t("cart.title")}
        isPaging={false}
        cartItems={cartItems}
      />
      <div className="mt-4 text-right">
        <div style={{ color: "rgb(242, 122, 26)" }}>
          <span style={{ fontSize: "28px" }}>{t("cart.total")}: </span>
          <span style={{ fontSize: "32px" }}> {cartTotal.toFixed(2)} $</span> <br />
          <Button color="success">
            <Link to={cartTotal === 0 ? "/" : "/payment"}>
              <span className="text-light">
                {cartTotal === 0 ? t("cart.emtyCart") : t("cart.goPayment")}
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  cartOperations(data, type) {
    dispatch(cartActions(data, type));
  },
});
const mapStateToProps = (state) => ({
  cartItems: state.cartData.data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("common")(Cart));
