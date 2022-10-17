import { useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  visiblePeople: Person[];
  slug: string | undefined;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
  visiblePeople,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function searchName(name: string | null) {
    const existPerson = people.find(person => person.name === name);

    if (!existPerson) {
      return name || '-';
    }

    return <PersonLink person={existPerson} />;
  }

  function createSortLink(value: string) {
    return (
      <SearchLink
        params={{
          sort: (sort !== null && order !== null) ? null : value,
          order: (order === null && sort !== null) ? 'desc' : null,
        }}
      >
        <span className="icon">
          <i
            className={classNames(
              'fas',
              { 'fa-sort': sort !== value },
              { 'fa-sort-up': sort === value && order === null },
              { 'fa-sort-down': sort === value && order === 'desc' },
            )}
          />
        </span>
      </SearchLink>
    );
  }

  const filterByParam = () => {
    let sortedPeople = [...visiblePeople];

    switch (sort) {
      case 'name':
        sortedPeople.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case 'sex':
        sortedPeople.sort((a, b) => {
          return a.sex.localeCompare(b.sex);
        });
        break;
      case 'born':
        sortedPeople.sort((a, b) => {
          return a.born - b.born;
        });
        break;
      case 'died':
        sortedPeople.sort((a, b) => {
          return a.died - b.died;
        });
        break;
      default:
        break;
    }

    if (order === 'desc') {
      sortedPeople = sortedPeople.reverse();
    }

    return sortedPeople;
  };

  useEffect(() => {
    filterByParam();
  }, [sort]);

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
              {createSortLink('name')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {createSortLink('sex')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {createSortLink('born')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {createSortLink('died')}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filterByParam().map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames(
              { 'has-background-warning': person.slug === slug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {searchName(person.motherName)}
            </td>
            <td>
              {searchName(person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
