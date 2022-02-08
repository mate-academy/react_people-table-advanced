interface Props extends Pick<FormFields, 'sex'> {
  handleInputChange: (fieldName: keyof FormFields, value: string) => void,
}

export const SexSelection: React.FC<Props> = ({
  sex,
  handleInputChange,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor="sex-selection">
        Sex
        <div className="control" id="sex-selection">
          <label className="radio" htmlFor="radio-m">
            <input
              type="radio"
              id="radio-m"
              name="question"
              checked={sex === 'm'}
              onChange={() => {
                handleInputChange('sex', 'm');
              }}
            />
            M
          </label>
          <label className="radio" htmlFor="radio-f">
            <input
              type="radio"
              id="radio-f"
              name="question"
              checked={sex === 'f'}
              onChange={() => {
                handleInputChange('sex', 'f');
              }}
            />
            F
          </label>
        </div>
      </label>
    </div>
  );
};
