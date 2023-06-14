import { useMemo } from 'react';
import { SortSex } from '../types/SortSex';
import { Sort } from '../types/Sort';

export const useSortAndSearch = (people, sex, centuries, query, sort) => {
  const modifiedPeople = useMemo(() => {
    return (people
      .filter(person => {
        switch (sex) {
          case SortSex.female:
            return person.sex === 'f';
          case SortSex.male:
            return person.sex === 'm';
          default:
          case SortSex.all:
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
          case Sort.name:
            return (a.name?.localeCompare(b.name));
          case Sort.sex:
            return (a.sex?.localeCompare(b.sex));
          case Sort.born:
            return (a.born - b.born);
          case Sort.died:
            return (a.died - b.died);
          default:
          case Sort.none:
            return 0;
        }
      })
    );
  }, [people, sex, query, centuries, sort]);

  return modifiedPeople;
};
