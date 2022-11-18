/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { getAction } from "./redux/actions/getAction";
import { connect } from "react-redux";
import { Button, Col, Progress, Row } from "reactstrap";
import Loading from "./shared/components/Loading";
import { cartActions } from "./redux/actions/cartActions";
import { deleteAction } from "./redux/actions/deleteAction";
import AddNew from "./AddNew";
import { withTranslation } from 'react-i18next';


const getProgressColor = (rate) => {
  if (rate >= 80) {
    return "success";
  } else if (rate >= 60) {
    return "";
  } else if (rate >= 40) {
    return "warning";
  } else {
    return "danger";
  }
};

const ProductDetail = (props) => {
  const {
    id,
    getProductDetail,
    productDetail,
    productDetailLoading,
    cartOperations,
    cartData,
    deleteProduct,
    t
  } = props;
  useEffect(() => {
    if (id) {
      getProductDetail(id);
      const productInCart = cartData?.filter((item) => item.id === id);
      setCount(productInCart.length);
    }
  }, []);

  const [count, setCount] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const addToCart = (data) => {
    cartOperations(data, "add");
    setCount(count + 1);
  };
  const removeFromCart = (data) => {
    cartOperations(data, "remove");
    setCount(count - 1);
  };

  return (
    <div>
 {
      tabIndex === 0 ?
      <div>
      {productDetailLoading ? (
        <Loading />
      ) : (
        <Row>
          <Col xs={12} lg={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <img src={productDetail.image} style={{ width: "inherit" }} />
            </div>
          </Col>
          <Col xs={12} lg={8} className="p-4">
            <h4>{productDetail.title}</h4>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>{productDetail.category}</div>
              <div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    {productDetail?.rating?.rate && (
                      <>
                        <Progress
                          value={productDetail?.rating?.rate * 20 || 0}
                          color={getProgressColor(
                            productDetail?.rating?.rate * 20 || 0
                          )}
                          style={{ width: "100px", height: "10px" }}
                        />
                        {productDetail.rating.rate}/5
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <b>{t('productDetail.description')}:</b> <br />
              {productDetail.description}
            </div>
            <div
              className="text-right"
              style={{ color: "#f27a1a", fontSize: "32px" }}
            >
              {productDetail.price} $
            </div>
            <div
              className="d-flex mt-4"
              style={{ justifyContent: "space-between" }}
            >
              
              <div>
                <Button
                  color="danger"
                  onClick={() => {
                    deleteProduct(productDetail.id)
                  }}
                >
                  {t('productDetail.deleteProduct')}
                </Button>
              </div>
              <div>
                <Button
                  color="warning"
                  onClick={() => {
                    setTabIndex(1)
                  }}
                >
                  {t('productDetail.updateProduct')}
                </Button>
              </div>
              <div className="d-flex">
                <div>
                  <Button
                    color="danger"
                    disabled={count < 1}
                    onClick={() => {
                      removeFromCart(productDetail);
                    }}
                  >
                    -
                  </Button>
                </div>
                <div
                  className="text-center"
                  style={{ width: "38px", fontSize: "28px" }}
                >
                  {count}
                </div>
                <div>
                  <Button
                    color="success"
                    onClick={() => {
                      addToCart(productDetail);
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
    :
    <div>
      <AddNew
                  initialValues={productDetail}
                  setTabIndex={setTabIndex}
                  />
    </div>
    }
    </div>
   
   
  );
};
const mapDispatchToProps = (dispatch) => ({
  getProductDetail(id) {
    dispatch(getAction("products", id));
  },
  cartOperations(data, type) {
    dispatch(cartActions(data, type));
  },
  deleteProduct(id) {
    dispatch(deleteAction("products", id));
  },
  
});
const mapStateToProps = (state) => ({
  productDetail: state.productDetail.data,
  productDetailLoading: state.productDetail.loading,
  cartData: state.cartData.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(ProductDetail));
