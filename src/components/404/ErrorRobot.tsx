import img from './error.gif';

const ErrorRobot = () => {
  return (
    <img
      src={img}
      alt="error"
      style={{
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
        backgroundColor: '#ecd5f5',
      }}
    />
  );
};

export default ErrorRobot;
