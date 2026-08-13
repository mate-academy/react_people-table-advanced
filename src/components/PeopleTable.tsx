import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SortFields } from '../types/SortFields';
import { usePeopleParams } from '../hooks/usePeopleParams';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const { sort, order } = usePeopleParams();

  const getSortSearch = (fieldToSort: SortFields) => {
    if (sort !== fieldToSort) {
      return getSearchWith(searchParams, { sort: fieldToSort, order: null });
    }

    if (order === 'desc') {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    return getSearchWith(searchParams, { sort: fieldToSort, order: 'desc' });
  };

  const getSortfieldClass = (sortField: SortFields) => {
    return classNames('fas', {
      'fa-sort': sort !== sortField,
      'fa-sort-up': sort === sortField && !order,
      'fa-sort-down': sort === sortField && order === 'desc',
    });
  };

  const sortFieldsConfig = [
    { label: 'Name', type: SortFields.Name },
    { label: 'Sex', type: SortFields.Sex },
    { label: 'Born', type: SortFields.Born },
    { label: 'Died', type: SortFields.Died },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFieldsConfig.map(sortField => (
            <th key={sortField.type}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortField.label}
                <Link to={{ search: getSortSearch(sortField.type) }}>
                  <span className="icon">
                    <i className={getSortfieldClass(sortField.type)} />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherInList = people.find(
            mother => mother.name === person.motherName,
          );

          const fatherinList = people.find(
            father => father.name === person.fatherName,
          );

          return (
            <PersonLink
              key={person.slug}
              person={person}
              motherInList={motherInList}
              fatherInList={fatherinList}
            />
          );
        })}
      </tbody>
    </table>
  );
};
