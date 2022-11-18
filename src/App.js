import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import store, {persistor} from "./store";
import Cart from "./Cart";
import Login from "./Login";
import {PersistGate} from 'redux-persist/integration/react'
import Payment from "./Payment";
import AddNew from "./AddNew";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config as i18nextConfig } from './translations';
import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { I18nextProvider } from 'react-i18next';

i18next
  .use(detector)
  .init(i18nextConfig);

document.documentElement.lang = i18next.language;

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <ToastContainer />
      <I18nextProvider i18n={i18next}>
 <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<p>Burada Böyle Bir Şey Yok</p>} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/addNew"
              element={
                <PrivateRoute>
                  <AddNew />
                </PrivateRoute>
              }
            />
            
          </Routes>
        </div>
      </Router>
      </I18nextProvider>
      </PersistGate>
     
    </Provider>
  );
}


export default App;
