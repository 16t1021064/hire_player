import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";

const __prod__ = process.env.NODE_ENV === "production";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: createRootReducer(),
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  devTools: !__prod__,
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
