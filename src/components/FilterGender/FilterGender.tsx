import { Dispatch } from 'react';
import { Sex } from '../../types/Sex';
import cn from 'classnames';

interface FilterGenderProps {
  setSexFilter: Dispatch<React.SetStateAction<Sex | null>>;
  sexFilter: Sex | null;
}

export const FilterSex = {
  All: null,
  Male: 'm',
  Female: 'f',
} as const;

export const FilterGender: React.FC<FilterGenderProps> = ({
  setSexFilter,
  sexFilter,
}) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(FilterSex).map(([text, gender]) => {
        const href = gender ? `#/people?sex=${gender}` : '#/people';

        return (
          <a
            key={text}
            className={cn({ 'is-active': gender === sexFilter })}
            href={href}
            onClick={event => {
              event.preventDefault();
              setSexFilter(gender);
            }}
          >
            {text}
          </a>
        );
      })}
    </p>
  );
};
