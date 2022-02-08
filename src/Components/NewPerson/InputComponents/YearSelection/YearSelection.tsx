type Props = {
  title: string,
  fieldName: keyof FormFields,
  value: number | null,
  hasError: boolean,
  min: number,
  max: number,
  disabled: boolean,
  handleInputChange: (fieldName: keyof FormFields, value: number) => void,
  validateFields: (fieldName: keyof FormFields) => void,
};

export const YearSelection: React.FC<Props> = ({
  title,
  fieldName,
  value,
  hasError,
  min,
  max,
  disabled,
  handleInputChange,
  validateFields,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={`${fieldName}-input`}>
        {title}
        <div className="control">
          <input
            className="input"
            type="number"
            id={`${fieldName}-input`}
            placeholder={title}
            min={min}
            max={max}
            value={value || ''}
            onChange={(e) => {
              handleInputChange(fieldName, +e.target.value);
            }}
            onBlur={() => {
              validateFields(fieldName);
            }}
            disabled={disabled}
          />
        </div>
      </label>
      <p className="help is-danger">
        {hasError && `Must be between ${min} and ${max}`}
      </p>
    </div>
  );
};
