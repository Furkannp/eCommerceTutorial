const initialState = {
    loading: false,
    data: [],
    error: null,
    success: false,
  };
  
  export const getProductsReducer = () => (state = initialState, action) => {
    switch (action.type) {
      case `GET_PRODUCTS_REQUEST`: {
        return {
          ...state,
          loading: true,
          success: false,
        };
      }
      case `GET_PRODUCTS_SUCCESS`: {
        return {
          ...state,
          data: action.data,
          loading: false,
          success: true,
        };
      }
      case `GET_PRODUCTS_FAILURE`: {
        return {
          ...state,
          error: action.error,
          loading: false,
          data: [],
          success: false,
        };
      }
      default:
        return state;
    }
  };
  