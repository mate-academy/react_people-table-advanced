type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const NameFilter = ({ value, onChange }: Props) => {
  return (
    <div className="control has-icons-left is-fullwidth">
      <input
        id="search-input"
        type="text"
        className="input"
        placeholder="Search"
        value={value}
        onChange={event => onChange(event.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </div>
  );
};
