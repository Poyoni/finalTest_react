import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import './index.css'
import App from './App.tsx'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
