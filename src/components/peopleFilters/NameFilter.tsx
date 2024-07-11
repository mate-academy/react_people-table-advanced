import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('query') || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      new URLSearchParams(
        getSearchWith(searchParams, {
          query: event.currentTarget.value || null,
        }),
      ),
    );
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={name}
          onChange={handleChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
