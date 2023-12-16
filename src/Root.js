import { Provider } from "react-redux";
import { store } from "./store";
import {App} from "./App";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => (
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

export default Root;
