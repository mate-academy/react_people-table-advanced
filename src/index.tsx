// import { createRoot } from 'react-dom/client';
// import { HashRouter as Router } from 'react-router-dom';

// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// import { App } from './App';

// createRoot(document.getElementById('root') as HTMLDivElement).render(
//   <Router>
//     <App />
//   </Router>,
// );

import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
