import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { NoPeopleMessage } from '../NoPeopleMessage/NoPeopleMessage';
import { PersonLink } from '../PersonLink/PersonLink';
import { Sex } from '../../types/Sex';
import { SearchLink } from '../SearchLink';
import { SortCategory } from '../../types/sortCategory';
import { handleSort } from '../../helpers/handleSort';
import { getSortIconClass } from '../../helpers/getSortIconClass';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    let filteredList = [...people];
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];

    const lowerCaseQuery = query.toLowerCase().trim();

    filteredList = people.filter(
      (person) => person.name.toLowerCase().includes(lowerCaseQuery)
        || person.motherName?.toLowerCase().includes(lowerCaseQuery)
        || person.fatherName?.toLowerCase().includes(lowerCaseQuery),
    );

    if (!query) {
      searchParams.delete('query');
    }

    if (centuries.length) {
      filteredList = filteredList.filter(
        person => centuries.includes(String(Math.ceil(+person.born / 100))),
      );
    }

    switch (searchParams.get('sex')) {
      case Sex.MALE: {
        filteredList = filteredList.filter((person) => person.sex === Sex.MALE);
        break;
      }

      case Sex.FEMALE: {
        filteredList = filteredList.filter(
          (person) => person.sex === Sex.FEMALE,
        );
        break;
      }

      default: {
        break;
      }
    }

    const sortBy = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    switch (sortBy) {
      case SortCategory.name: {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      }

      case SortCategory.born: {
        filteredList.sort((a, b) => a.born - b.born);
        break;
      }

      case SortCategory.died: {
        filteredList.sort((a, b) => a.died - b.died);
        break;
      }

      case SortCategory.sex: {
        filteredList.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      }

      default:
        break;
    }

    if (sortOrder) {
      filteredList.reverse();
    }

    setFilteredPeople(filteredList);
  }, [people, searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={handleSort(SortCategory.name, searchParams)}
              >
                <span className="icon">
                  <i
                    className={
                      getSortIconClass(SortCategory.name, searchParams)
                    }
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSort(SortCategory.sex, searchParams)}>
                <span className="icon">
                  <i className={
                    getSortIconClass(SortCategory.sex, searchParams)
                  }
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSort(SortCategory.born, searchParams)}>
                <span className="icon">
                  <i className={
                    getSortIconClass(SortCategory.born, searchParams)
                  }
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSort(SortCategory.died, searchParams)}>
                <span className="icon">
                  <i className={
                    getSortIconClass(SortCategory.died, searchParams)
                  }
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {!people.length || !filteredPeople.length ? (
          <NoPeopleMessage />
        ) : (
          filteredPeople.map((person) => <PersonLink person={person} />)
        )}
      </tbody>
    </table>
  );
};
