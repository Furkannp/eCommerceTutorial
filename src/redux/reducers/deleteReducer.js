const initialState = {
    loading: false,
    data: [],
    error: null,
    success: false,
  };
  
  export const deleteReducer = (namespace) => (state = initialState, action) => {
    switch (action.type) {
      case `${namespace}/DELETE_REQUEST`: {
        return {
          ...state,
          loading: true,
          success: false,
        };
      }
      case `${namespace}/DELETE_SUCCESS`: {
        return {
          ...state,
          data: action.data,
          loading: false,
          success: true,
        };
      }
      case `${namespace}/DELETE_FAILURE`: {
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
  