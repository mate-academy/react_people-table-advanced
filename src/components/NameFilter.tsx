import { SearchParams } from '../utils/searchHelper';

type Props = {
  handleUpdate: (paramsToUpdate: SearchParams) => void;
};

export const NameFilter: React.FC<Props> = ({ handleUpdate }) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={e => {
            const value = e.target.value.trim();

            handleUpdate({ query: value !== '' ? value : null });
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
