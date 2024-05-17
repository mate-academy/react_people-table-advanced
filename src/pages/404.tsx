import { Link } from 'react-router-dom';
import ErrorRobot from '../components/404/ErrorRobot';

function Page404() {
  return (
    <div className="section">
      <div className="container">
        <div style={{ marginTop: '10%' }}>
          <ErrorRobot />
          <h1 className="title" style={{ textAlign: 'center' }}>
            Page not found
          </h1>

          <Link
            style={{
              display: 'block',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '24px',
              marginTop: '30px',
            }}
            to="/"
          >
            Back to main page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;
