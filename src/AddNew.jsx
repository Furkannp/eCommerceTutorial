/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { getAction } from "./redux/actions/getAction";
import { postAction } from "./redux/actions/postAction";
import { renderSelectField, renderTextField } from "./shared/components/fields";
import { putAction } from "./redux/actions/putAction";
import { withTranslation } from "react-i18next";

const addNew = (props) => {
  const { handleSubmit, initialValues, initialize, t } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAction("products/categories"));
    initialize(initialValues);
  }, []);

  const categories = useSelector((state) => state.categories.data);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} className="mb-3">
            <Field
              name="title"
              component={renderTextField}
              label={t("addNew.title")}
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Field
              name="price"
              component={renderTextField}
              label={t("addNew.price")}
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Field
              name="description"
              component={renderTextField}
              label={t("addNew.description")}
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Field
              name="image"
              component={renderTextField}
              label={t("addNew.image")}
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Field
              name="category"
              component={renderSelectField}
              label={t("addNew.category")}
            >
              <option value=""></option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category.toUpperCase()}
                </option>
              ))}
            </Field>
          </Col>
        </Row>
        <Button className="login_btn underlineHover" type="submit">
          {t("addNew.save")}
        </Button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "Add_New_Product_Form",
  enableReinitialize: true,
  onSubmit: (values, dispatch) => {
    if (values.id) {
      dispatch(putAction("products", values.id, values));
    } else {
      dispatch(postAction("products", null, values));
    }
  },
})(withTranslation("common")(addNew));
