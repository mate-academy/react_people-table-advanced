import { useNavigate } from 'react-router-dom';

export const AddPerson = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="button is-fullwidth"
      onClick={() => navigate('/people/new')}
    >
      Add person
    </button>
  );
};
