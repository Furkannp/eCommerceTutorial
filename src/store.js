import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getProductsReducer } from './redux/reducers/getProductsReducer';
import { getReducer } from './redux/reducers/getReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './redux/reducers/authReducer';
import { cartReducer } from './redux/reducers/cartReducer';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import { postReducer } from './redux/reducers/postReducer';
import { deleteReducer } from './redux/reducers/deleteReducer';
import { putReducer } from './redux/reducers/putReducer';


const persistConfig= {
  key: 'test',
  storage,
}


const reducer = combineReducers({
  form: reduxFormReducer,
  auth: authReducer,
  cartData: cartReducer(),

  // GET
  getProducts: getProductsReducer(),
  productDetail: getReducer('products'),
  categories: getReducer('products/categories'),
  cartItems: getReducer('cart'),

  //POST
  productSave: postReducer('products'),
  //POST
  productUpdate: putReducer('products'),

  //DELETE
  productDelete: deleteReducer('products'),


});
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store)
export default store;
export {persistor}
