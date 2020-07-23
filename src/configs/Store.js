import ReduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

import rootReducer from "../redux/reducer";

const middleware = applyMiddleware(ReduxThunk);
const store = createStore(rootReducer, middleware);
export { store };
