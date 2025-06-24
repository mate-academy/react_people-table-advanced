export const FilterSex = {
  All: null,
  Male: 'm',
  Female: 'f',
} as const;

export const FilterGender = () => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(FilterSex).map(([text, gender]) => {
        const href = gender ? `#/people?sex=${gender}` : '#/people';

        return (
          <a key={text} className="is-active" href={href}>
            {text}
          </a>
        );
      })}
    </p>
  );
};
