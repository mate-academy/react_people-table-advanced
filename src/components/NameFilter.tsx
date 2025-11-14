interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export const NameFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="field">
      <h1>Search by name</h1>

      <div className="control">
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Type a name..."
        />
      </div>
    </div>
  );
};
