/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { getAction } from "./redux/actions/getAction";
import { withTranslation } from 'react-i18next';


const Categories = (props) => {
  const { getProducts, limit, t, setLimit } = props;
  const [selectedCategory, setselectedCategory] = useState("all");
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAction("products/categories"));
  }, []);

useEffect(() => {
  setselectedCategory("all");
}, [limit])


  const changeCategory = (category) => {
    if (category === "all") {
      getProducts();
    } else {
      getProducts(null, category);
    }
    setselectedCategory(category);
    setLimit("all")
  };
  return (
    <div className="mb-1">
      <h5>{t('categories.title')}</h5>
      <div className="p-0 mt-4" style={{ listStyle: "none" }}>
        <Button
          key="AllProducts"
          className="my-3 categoryBtn"
          style={{ backgroundColor: selectedCategory === "all" && "#fbd8ff" }}
          onClick={() => {
            changeCategory("all");
          }}
        >
          <span style={{ fontSize: "16px" }}>{t('categories.allProducts')}</span>
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            className="my-3 categoryBtn"
            style={{
              backgroundColor: selectedCategory === category && "#fbd8ff",
            }}
            onClick={() => {
              changeCategory(category);
            }}
          >
            <span style={{ fontSize: "16px" }}>{category.toUpperCase()}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default (withTranslation('common')(Categories));
