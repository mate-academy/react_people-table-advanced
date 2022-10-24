import classNames from 'classnames';
import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonalLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};
export const PeopleTable: FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const namePeople = (name: string | null) => {
    const findName = people.find(peoples => peoples.name === name);

    if (!findName) {
      return name || '-';
    }

    return <PersonalLink person={findName} />;
  };

  const sortFilter = useCallback((setVisiblePeople: Person[]) => {
    // const setVisiblePeople = visiblePeople;

    switch (sort) {
      case 'name':
        setVisiblePeople.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case 'sex':
        setVisiblePeople.sort((a, b) => {
          return a.sex.localeCompare(b.sex);
        });
        break;
      case 'born':
        setVisiblePeople.sort((a, b) => {
          return a.born - b.born;
        });
        break;
      case 'died':
        setVisiblePeople.sort((a, b) => {
          return a.died - b.died;
        });
        break;
      default:
        break;
    }

    if (order === 'desc') {
      return setVisiblePeople.reverse();
    }

    return setVisiblePeople;
  }, [sort, order]);

  const sortSearchLink = (value: string) => {
    return (
      <SearchLink
        params={{
          sort: !sort || !order ? value : null,
          order: sort && !order ? 'desc' : null,
        }}
      >
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      </SearchLink>
    );
  };

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
              {sortSearchLink('name')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {sortSearchLink('sex')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {sortSearchLink('born')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {sortSearchLink('died')}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortFilter([...people]).map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames(
              { 'has-background-warning': person.slug === slug },
            )}
          >
            <td>
              <PersonalLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{namePeople(person.motherName)}</td>
            <td>{namePeople(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
