/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import Categories from "./Categories";
import ProductDetail from "./ProductDetail";
import { getProductsAction } from "./redux/actions/getProductsAction";
import CustomModal from "./shared/components/CustomModal";
import CustomTable from "./shared/components/CustomTable";
import { withTranslation } from 'react-i18next';



const Home = (props) => {
  const { getProducts, products, productsLoading, productDeleteSuccess, productUpdateSuccess, t } =
    props;

  useEffect(() => {
    getProducts();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [limit, setLimit] = useState("all");
  const [selectedRowData, setSelectedRowData] = useState(undefined);
  const [sorting, setSorting] = useState(true); // true means asc

  useEffect(() => {
    if (selectedRowData) {
      setIsOpen(true);
    }
  }, [selectedRowData]);

  useEffect(() => {
    setIsOpen(false);
  }, [productDeleteSuccess, productUpdateSuccess]);

  const sort = (value) => {
    if (value === true) {
      getProducts("sort=asc");
      setSorting(true);
    } else {
      getProducts("sort=desc");
      setSorting(false);
    }
  };

  const onLimitChange = (limit) => {
    if (limit === "all") {
      getProducts();
    } else {
      getProducts("limit=" + limit);
    }
    setLimit(limit);
  };

  return (
    <>
      <Row>
        <Col
          xs={2}
          className="p-3"
          style={{ borderRadius: "4px", background: "white" }}
        >
          <Categories getProducts={getProducts} limit={limit} setLimit={setLimit}></Categories>
        </Col>
        <Col xs={10}>
          <CustomTable
            columns={[
              { title: t('home.productsTable.columns.no'), field: "id" },
              { title: t('home.productsTable.columns.image'), field: "image" },
              { title: t('home.productsTable.columns.title'), field: "title" },
              { title: t('home.productsTable.columns.category'), field: "category" },
              { title: t('home.productsTable.columns.price'), field: "price" },
            ]}
            customButtonBool
            customButtonOnClick={() => {
              sort(!sorting);
            }}
            customButtonText={`${t('home.sorting')}: ${
              sorting ? t('home.ascending') : t('home.decreasing')
            } - ${t('home.change')}`}
            limitButtonBool
            selectedLimit={limit}
            onLimitChange={onLimitChange}
            isLoading={productsLoading}
            data={products}
            title={t('home.productsTable.title')}
            isPaging
            onClick={setSelectedRowData}
          />
        </Col>
      </Row>

      <CustomModal
        isModalOpen={isOpen}
        toggleModal={() => setIsOpen(!isOpen)}
        onClosed={() => setSelectedRowData(undefined)}
        content={<ProductDetail id={selectedRowData?.id}></ProductDetail>}
      />
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getProducts(query, category) {
    dispatch(getProductsAction(query, category));
  },
});
const mapStateToProps = (state) => ({
  products: state.getProducts.data,
  productsLoading: state.getProducts.loading,
  productDeleteSuccess: state.productDelete.success,
  productUpdateSuccess: state.productUpdate.success,
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(Home));
// export default Home;
