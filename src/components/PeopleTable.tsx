import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchParams } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortType } from '../types/sortType';

type Props = {
  persons: Person[];
};
export const PeopleTable: React.FC<Props> = ({ persons }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const rowData = {
    Name: 'name',
    Sex: 'sex',
    Born: 'born',
    Died: 'died',
  };

  const setSorting = (value: string): SearchParams => {
    if ((!sort && !order) || (sort !== value)) {
      return { sort: value };
    }

    if (sort === value && !order) {
      return { sort: value, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortPeople = persons.sort((first, second) => {
    switch (sort) {
      case SortType.Name:
      case SortType.Sex:
        return order === 'desc'
          ? second[sort].localeCompare(first[sort])
          : first[sort].localeCompare(second[sort]);
      case SortType.Born:
      case SortType.Dies:
        return order === 'desc'
          ? second[sort] - first[sort]
          : first[sort] - second[sort];
      default: return 0;
    }
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(rowData).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={setSorting(value)}
                >
                  <span className="icon">
                    <i
                      className={
                        classNames(
                          'fas',
                          { 'fa-sort': sort !== value },
                          { 'fa-sort-up': sort === value && !order },
                          { 'fa-sort-down': sort === value && order },
                        )
                      }
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td><PersonLink person={person} /></td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  );
};
