type Props = {
  title: string,
  value: string,
  fieldName: keyof FormFields,
  disabled: boolean,
  defaultOption: string,
  parents: ProcessedPerson[],
  handleInputChange: (fieldName: keyof FormFields, value: string) => void,
};

export const ParentSelect: React.FC<Props> = ({
  title,
  value,
  fieldName,
  disabled,
  defaultOption,
  parents,
  handleInputChange,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor="mother-select">
        {title}
        <div className="control">
          <div className="select">
            <select
              id="mother-select"
              value={value}
              onChange={(e) => {
                handleInputChange(fieldName, e.target.value);
              }}
              disabled={disabled}
            >
              <option>{defaultOption}</option>
              {parents.map(({ name }) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </label>
    </div>
  );
};
