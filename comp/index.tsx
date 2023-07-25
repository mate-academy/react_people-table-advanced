import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);
