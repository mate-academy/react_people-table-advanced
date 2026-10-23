type Props = {
  query: string;
  onChange: (query: string) => void;
};

export const NameFilter: React.FC<Props> = ({ query, onChange }) => (
  <div className="field">
    <label className="label" htmlFor="name-filter">
      Name
    </label>

    <div className="control has-icons-left has-icons-right">
      <input
        id="name-filter"
        data-cy="NameFilter"
        className="input"
        type="text"
        placeholder="Search"
        value={query}
        onChange={event => onChange(event.target.value)}
      />

      <span className="icon is-small is-left">
        <i className="fas fa-search" />
      </span>

      {query && (
        <button
          type="button"
          aria-label="Clear name filter"
          className="delete is-small"
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
          }}
          onClick={() => onChange('')}
        />
      )}
    </div>
  </div>
);
