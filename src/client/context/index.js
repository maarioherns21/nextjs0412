import { createContext, useContext, useReducer } from "react";
import { authConstant } from "./constant";

// Define the initial state of the application
const initialState = {
    user: {
      authenticated: false,
      authenticating: false,
      error: null,
    },
  };


const Store = createContext();


// Define the reducer function that updates the state based on dispatched actions
const reducer = (state, action) => {
    console.log(state)
    switch (action.type) {
      case authConstant.LOGIN_REQUEST:
        return {
          ...state,
          user: {
            ...state.user,
            authenticating: true,
          },
        };
      case authConstant.LOGIN_SUCCESS:
        return {
          ...state,
          user: {
            ...action.payload,
            authenticated: true,
            authenticating: false,
          },
        };
       case authConstant.LOGIN_FAILURE:
        return {
          ...state,
          user: {
            ...state.user,
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };



export const useStore = () => useContext(Store);



export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
   
    return( 
        <Store.Provider value={[state, dispatch]}>
          {children}
          </Store.Provider>
          );
      };



// export const StoreProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     user: {
//       authenticated: false,
//       authenticating: false,
//       error: null,
//     },
//   });

//   return( 
//   <Store.Provider value={[state, dispatch]}>
//     {children}
//     </Store.Provider>
//     );
// };


