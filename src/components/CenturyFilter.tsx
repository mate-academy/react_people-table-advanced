type Props = {
  centuries: number[];
  selectedCenturies: string[];
  onChange: (centuries: string[]) => void;
};

export const CenturyFilter: React.FC<Props> = ({
  centuries,
  selectedCenturies,
  onChange,
}) => {
  const toggleCentury = (century: string) => {
    if (selectedCenturies.includes(century)) {
      onChange(selectedCenturies.filter(value => value !== century));
    } else {
      onChange([...selectedCenturies, century]);
    }
  };

  return (
    <div className="panel" data-cy="CenturyFilter">
      <p className="panel-heading">Centuries</p>

      <div className="panel-block">
        <a
          href="?"
          className={!selectedCenturies.length ? 'is-active' : ''}
          onClick={event => {
            event.preventDefault();
            onChange([]);
          }}
        >
          All
        </a>
      </div>

      {centuries.map(century => {
        const value = String(century);

        return (
          <div className="panel-block" key={century}>
            <a
              href={`?centuries=${value}`}
              className={selectedCenturies.includes(value) ? 'is-active' : ''}
              onClick={event => {
                event.preventDefault();
                toggleCentury(value);
              }}
            >
              {century}
            </a>
          </div>
        );
      })}
    </div>
  );
};
