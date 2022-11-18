/* eslint-disable react/prop-types */
import React from "react";
import { Button, Col, Row } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { maskInput, renderField } from "./shared/components/fields";
import { rules } from "./validate";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartActions } from "./redux/actions/cartActions";
import { withTranslation } from 'react-i18next';


const PaymentForm = (props) => {
  const { handleSubmit, submitting, pristine, t } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Row>
            <div className="d-block w-100">
              <h4 className="px-3">{t('payment.form.personalInfo')}</h4>
            </div>
            <Col xs={12} lg={4}>
              <Field
                name="name"
                component={renderField}
                placeholder={(t('payment.form.fields.name'))}
                type="text"
                customClassName="cardInput"
                validate={[rules.required, rules.letter]}
              />
            </Col>
            <Col xs={12} lg={4}>
              <Field
                name="surname"
                component={renderField}
                placeholder={(t('payment.form.fields.surname'))}
                type="text"
                customClassName="cardInput"
                validate={[rules.required, rules.letter]}
              />
            </Col>
            <Col xs={12} lg={4}>
              <Field
                name="email"
                component={renderField}
                placeholder={(t('payment.form.fields.email'))}
                type="email"
                customClassName="cardInput"
                validate={[rules.required, rules.email]}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <div className="d-block w-100">
              <h4 className="px-3">{(t('payment.form.addressInfo'))}</h4>
            </div>
            <Col xs={12} lg={3}>
              <Field
                name="country"
                component={renderField}
                placeholder={(t('payment.form.fields.country'))}
                type="text"
                customClassName="cardInput"
                validate={[rules.required]}
              />
            </Col>
            <Col xs={12} lg={3}>
              <Field
                name="city"
                component={renderField}
                placeholder={(t('payment.form.fields.city'))}
                type="text"
                customClassName="cardInput"
                validate={[rules.required]}
              />
            </Col>
            <Col xs={12} lg={3}>
              <Field
                name="county"
                component={renderField}
                placeholder={(t('payment.form.fields.county'))}
                type="text"
                customClassName="cardInput"
                validate={[rules.required]}
              />
            </Col>
            <Col xs={12} lg={3}>
              <Field
                name="fullAddress"
                component={renderField}
                placeholder={(t('payment.form.fields.fullAddress'))}
                type="text"
                customClassName="cardInput"
                validate={[rules.required]}
              />
            </Col>
          </Row>
          <hr />
        </div>
        <Row>
        <h4 className="px-3">{t('payment.form.cardInfo')}</h4>
          <Col xs={12}>
            <Field
              name="cardNumber"
              component={maskInput}
              mask={[
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
              ]}
              placeholder={(t('payment.form.fields.cardNumber'))}
              type="text"
              customClassName="cardInput"
              validate={[rules.required]}
            />
          </Col>
          <Col xs={12}>
            <Field
              name="cardOwner"
              component={renderField}
              placeholder={(t('payment.form.fields.cardOwner'))}
              type="text"
              customClassName="cardInput"
              validate={[rules.required, rules.name_surname, rules.letter]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              name="validDate"
              component={maskInput}
              mask={[/[0-9]/, /[0-9]/, "/", /[0-9]/, /[0-9]/]}
              placeholder={(t('payment.form.fields.validDate'))}
              type="text"
              customClassName="cardInput"
              validate={[rules.required]}
            />
          </Col>
          <Col xs={4}>
            <Field
              name="cvc"
              component={renderField}
              placeholder={(t('payment.form.fields.cvc'))}
              type="text"
              customClassName="cardInput"
              validate={[rules.required, rules.char_3]}
            />
          </Col>
        </Row>
        <div className="d-flex"></div>
        <Button className="login_btn underlineHover" type="submit" disabled={pristine || submitting}>
          {t('payment.pay')}
        </Button>
      </form>
    </div>
  );
};
export default reduxForm({
  form: "Payment_Form",
  onSubmit: (values, dispatch) => {
    if(values.name === "Furkan"){
        toast.success("Ödeme Başarılı")
        setTimeout(() => {
            window.location.replace('/')
            dispatch(cartActions(null, "removeAll"))
        }, 2000);
    }else {
        toast.error("Ödeme Tamamlanamadı.")
        toast.error("İsim 'Furkan' olmak zorunda.")
    }
  },
})(withTranslation('common')(PaymentForm));
