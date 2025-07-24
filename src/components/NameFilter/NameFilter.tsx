import { useNavigate } from 'react-router-dom';
import { usePeopleContext } from '../../context/ContextProvider';

export const NameFilter: React.FC = () => {
  const navigate = useNavigate();
  const { query } = usePeopleContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    navigate(`?query=${encodeURIComponent(value)}`);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="text"
          className="input"
          placeholder="Search"
          value={query}
          onChange={e => handleChange(e)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
