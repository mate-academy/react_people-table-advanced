import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => (
  <>
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            <Loader />
            <TodoList />
          </div>
        </div>
      </div>
    </div>

    <TodoModal />
  </>
);
