import MainNavigation from '../components/Navigation/Navigation';

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <div className="section">
        <div className="container">
          <h1 className="title">Page not found</h1>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
