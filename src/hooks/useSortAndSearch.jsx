import { useMemo } from 'react';
import { Gender } from '../types/SortSex';
import { Sort } from '../types/Sort';

export const useSortAndSearch = (
  people,
  sex,
  centuries,
  query,
  sort,
  order,
) => {
  const modifiedPeople = useMemo(() => {
    return (people
      .filter(person => {
        switch (sex) {
          case Gender.Female:
            return person.sex === 'f';
          case Gender.Male:
            return person.sex === 'm';
          default:
            return person;
        }
      })
      .filter(person => person.name?.toLowerCase()
        .includes(query.toLowerCase() || '')
        || person.motherName?.toLowerCase().includes(query.toLowerCase() || '')
        || person.fatherName?.toLowerCase().includes(query.toLowerCase() || ''))

      .filter(person => {
        if (centuries.length > 0) {
          const convertedYearToCentury = Math.ceil(person.born / 100);

          return centuries.includes(convertedYearToCentury.toString());
        }

        return person;
      })

      .sort((a, b) => {
        switch (sort) {
          case Sort.Name:
            return (a.name?.localeCompare(b.name));
          case Sort.Sex:
            return (a.sex?.localeCompare(b.sex));
          case Sort.Born:
            return (a.born - b.born);
          case Sort.Died:
            return (a.died - b.died);
          default:
            return 0;
        }
      })
    );
  }, [people, sex, query, centuries, sort]);

  return order ? modifiedPeople.reverse() : modifiedPeople;
};
