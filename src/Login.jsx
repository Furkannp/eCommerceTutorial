/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { login } from "./redux/actions/authAction";
import { renderField } from "./shared/components/fields";

const Login = (props) => {
  const { handleSubmit } = props;
 const [isShowing, setisShowing] = useState(false)
  return (
    <div className="m-auto pt-5" style={{ maxWidth: '600px' }}>
      <form onSubmit={handleSubmit}>
        
        <Field
        name="username"
        component={renderField}
        placeholder="E-posta"
        type="text"
        customClassName="loginput"
      />
        <div className="d-flex">
        <Field
        name="password"
        component={renderField}
        type={isShowing ? "text" : "password"}
        customClassName="loginput"
        placeholder="Şifre"
        style={{ width: '100%' }}
      />
          <i
            className={`far fa-eye${isShowing ? "-slash" : ""}`}
            style={{
              cursor: "pointer",
              marginRight: "-30px",
              paddingLeft: "8px",
              marginBottom: "1rem",
              alignSelf: "center",
            }}
            onClick={() => setisShowing(!isShowing)}
          />
        </div>

        <Button
          className="login_btn underlineHover"
          type="submit"
        >
          GİRİŞ YAP
        </Button>
      </form>
    </div>
  );
};
export default reduxForm({
  form: "Login_Form",
  onSubmit: (values, dispatch) => {
    dispatch(login(values))
  },
})(Login);
