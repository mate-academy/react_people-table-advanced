import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <HashRouter basename="/react_people-table-advanced">
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
