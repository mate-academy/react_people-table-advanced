import { Navbar } from '../../components/Navbar';

export const Page404: React.FC = () => (
  <div data-cy="app">
    <Navbar />
    <div className="section">
      <div className="container">
        <h1 className="title">Page not found</h1>
      </div>
    </div>
  </div>
);
