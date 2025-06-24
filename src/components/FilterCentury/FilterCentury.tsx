export const FilterCenturyValue = [16, 17, 18, 19, 20];

export const FilterCentury = () => {
  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {FilterCenturyValue.map(century => (
          <a
            key={century}
            data-cy="century"
            className="button mr-1"
            href={`#/people?centuries=${century}`}
          >
            {century}
          </a>
        ))}
      </div>

      <div className="level-right ml-4">
        <a
          data-cy="centuryALL"
          className="button is-success is-outlined"
          href="#/people"
        >
          All
        </a>
      </div>
    </div>
  );
};
