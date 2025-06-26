import cn from 'classnames';
import { SearchLink } from '../SearchLink';

interface FilterGenderProps {
  sex: string | null;
}

export const FilterSex = {
  All: null,
  Male: 'm',
  Female: 'f',
} as const;

export const FilterGender: React.FC<FilterGenderProps> = ({ sex }) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(FilterSex).map(([text, gender]) => {
        return (
          <SearchLink
            key={text}
            className={cn({ 'is-active': gender === sex })}
            params={{ sex: gender }}
          >
            {text}
          </SearchLink>
        );
      })}
    </p>
  );
};
