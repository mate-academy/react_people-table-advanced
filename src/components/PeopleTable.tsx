import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { columns } from '../utils/helpers';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: FC<Props> = ({
  people,
}) => {
  const { personSlug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const getSortParams = (name: string) => {
    let sort = `${name.toLowerCase()}` || null;
    let order = null;

    if (searchParams.get('sort') === name.toLowerCase()
      && searchParams.get('order')) {
      sort = null;
    }

    if (searchParams.get('sort') === name.toLowerCase()
      && !searchParams.get('order')) {
      order = 'desc';
    }

    return {
      sort,
      order,
    };
  };

  const changeSortArrows = (name: string) => {
    if (searchParams.get('sort') === name.toLowerCase()
    && !searchParams.get('order')) {
      return 'fa-sort-up';
    }

    if (searchParams.get('sort') === name.toLowerCase()
      && searchParams.get('order')) {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ name, sortable }) => (
            <th key={name}>
              {sortable
                ? (
                  <span className="is-flex is-flex-wrap-nowrap">
                    {name}
                    <SearchLink params={getSortParams(name)}>
                      <span className="icon">
                        <i
                          className={classNames('fas', changeSortArrows(name))}
                        />
                      </span>
                    </SearchLink>
                  </span>
                ) : (
                  name
                )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people && people.map(person => {
          const mother = people.find(personsMother => (
            personsMother.name === person.motherName
          ));

          const father = people.find(personsFather => (
            personsFather.name === person.fatherName
          ));

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : person.motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
