import { FC } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { getSearchWith } from '../../utils/searchHelper';

const titleList = [
  { name: 'Name', link: 'name' },
  { name: 'Sex', link: 'sex' },
  { name: 'Born', link: 'born' },
  { name: 'Died', link: 'died' },
];

type Props = {
  people: Person[],
  sort: string,
  order: string,
  searchParams: URLSearchParams,
};

export const PeopleTable: FC<Props> = ({
  people,
  sort,
  order,
  searchParams,
}) => {
  const { slug: selectedSlug } = useParams();
  const location = useLocation();

  const onSort = (value: string) => {
    if (sort === value && !order) {
      return {
        search: getSearchWith((searchParams), { sort: value, order: 'desk' }),
      };
    }

    if (sort === value && order) {
      return {
        search: getSearchWith((searchParams), { sort: null, order: null }),
      };
    }

    return {
      search: getSearchWith((searchParams), { sort: value, order: null }),
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {titleList.map(title => (
            <th key={title.link}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title.name}
                <Link to={onSort(title.link)}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        {
                          'fa-sort': sort !== title.link,
                          'fa-sort-up': sort === title.link && !order,
                          'fa-sort-down': sort === title.link && order,
                        },
                      )}
                    />

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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames(
              { 'has-background-warning': person.slug === selectedSlug },
            )}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: location.search,
                }}
                className={classNames(
                  { 'has-text-danger': person.sex === 'f' },
                )}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                person.mother
                  ? <PersonLink person={person.mother} />
                  : person.motherName || '-'
              }
            </td>
            <td>
              {
                person.father
                  ? <PersonLink person={person.father} />
                  : person.fatherName || '-'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
