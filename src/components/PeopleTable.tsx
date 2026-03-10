/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.toString();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getOrder = (field: string) => {
    if (sort !== field) {
      return null;
    }

    if (!order) {
      return 'desc';
    }

    return null;
  };

  const getIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const getLinkToPerson = (personSlug: string) => ({
    pathname: `/people/${personSlug}`,
    search: currentSearch ? `?${currentSearch}` : '',
  });

  const getParent = (personName: string | null) => {
    return people.find(person => person.name === personName);
  };

  const renderParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = getParent(parentName);

    if (!parent) {
      return parentName;
    }

    return (
      <Link
        to={getLinkToPerson(parent.slug)}
        className={parent.sex === 'f' ? 'has-text-danger' : ''}
      >
        {parentName}
      </Link>
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
              <SearchLink
                params={{
                  sort: sort === 'name' && order === 'desc' ? null : 'name',
                  order: getOrder('name'),
                }}
              >
                <span className="icon">
                  <i className={getIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: sort === 'sex' && order === 'desc' ? null : 'sex',
                  order: getOrder('sex'),
                }}
              >
                <span className="icon">
                  <i className={getIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: sort === 'born' && order === 'desc' ? null : 'born',
                  order: getOrder('born'),
                }}
              >
                <span className="icon">
                  <i className={getIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: sort === 'died' && order === 'desc' ? null : 'died',
                  order: getOrder('died'),
                }}
              >
                <span className="icon">
                  <i className={getIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={getLinkToPerson(person.slug)}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>

            <td>{person.born}</td>

            <td>{person.died}</td>

            <td>{renderParent(person.motherName)}</td>

            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
