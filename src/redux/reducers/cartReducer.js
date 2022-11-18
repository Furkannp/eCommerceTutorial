
export const  cartReducer = () =>(state = {data:  []}, action) => {
    switch (action.type) {
      case `ADD_TO_CART`: {
        const newData = [
          ...state.data,
          action.data
      ]
        return {
          data: newData
        };
      }
      case `REMOVE_FROM_CART`: {
        const index = state.data.findIndex(obj => obj.id === action.data.id)
        const newData = [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1)
      ]
        return {
          data: newData
        };
      }
      case `REMOVE_ALL_FROM_CART`: {
        const newData = []
        return {
          data: newData,
        };
      }
      default:
        return state;
    }
  };