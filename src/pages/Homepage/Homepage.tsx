import { Navbar } from '../../components/Navbar';

export const Homepage: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <h1 className="title">Home Page</h1>
        </div>
      </div>
    </div>
  );
};
