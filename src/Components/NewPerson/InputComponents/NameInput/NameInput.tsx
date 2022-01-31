type Props = {
  value: string,
  handleInputChange: (fieldName: keyof FormFields, value: string) => void,
  validateFields: (fieldName: keyof FormFields) => void,
  errors: {
    [key: string]: boolean,
  }
};

export const NameInput: React.FC<Props> = ({
  value,
  handleInputChange,
  validateFields,
  errors,
}) => {
  const { isEmpty, hasForbiddenSymbols, userAlreadyExists } = errors;

  return (
    <div className="field">
      <label className="label" htmlFor="name-input">
        Name
        <div className="control">
          <input
            className="input"
            type="text"
            id="name-input"
            placeholder="Enter Full Name"
            value={value}
            onChange={(e) => {
              handleInputChange('name', e.target.value);
            }}
            onBlur={() => {
              validateFields('name');
            }}
          />
        </div>
      </label>
      <p className="help is-danger">
        {isEmpty && 'Cannot be empty'}
        {hasForbiddenSymbols && 'Should only contain letters and spaces'}
        {userAlreadyExists && 'Person with this name is already in the list'}
      </p>
    </div>
  );
};
