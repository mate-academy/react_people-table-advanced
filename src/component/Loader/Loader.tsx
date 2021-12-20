import Loader from 'react-loader-spinner';

const Spinner: React.FC = () => (
  <Loader
    type="ThreeDots"
    color="#212529"
    height={80}
    width={80}
  />
);

export default Spinner;
