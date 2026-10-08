/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { getSortIconClass } from '../utils/sortIconHelper';
import { SortField } from '../types/SortField';
import { getParentPerson } from '../utils/parentHelper';

export const getParentContent = (
  parentName: string | null,
  parent: Person | undefined,
  searchParams: URLSearchParams,
) => {
  if (!parentName) {
    return '-';
  }

  if (parent) {
    return (
      <Link
        to={{
          pathname: `/people/${parent.slug}`,
          search: searchParams.toString(),
        }}
        className={parent.sex === 'f' ? 'has-text-danger' : ''}
      >
        {parent.name}
      </Link>
    );
  }

  return parentName;
};

type Props = {
  people: Person[];
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, visiblePeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const { slug: selectedSlug } = useParams();

  const handleSortClick = (sortField: SortField) => {
    if (sort === null) {
      setSearchParams(getSearchWith(searchParams, { sort: sortField }));
    } else if (sort === sortField && order === null) {
      setSearchParams(getSearchWith(searchParams, { order: 'desc' }));
    } else if (sort === sortField && order === 'desc') {
      setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
    } else {
      setSearchParams(
        getSearchWith(searchParams, { sort: sortField, order: null }),
      );
    }
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
              <a onClick={() => handleSortClick(SortField.Name)}>
                <span className="icon">
                  <i
                    className={getSortIconClass(SortField.Name, sort, order)}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSortClick(SortField.Sex)}>
                <span className="icon">
                  <i className={getSortIconClass(SortField.Sex, sort, order)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSortClick(SortField.Born)}>
                <span className="icon">
                  <i
                    className={getSortIconClass(SortField.Born, sort, order)}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSortClick(SortField.Died)}>
                <span className="icon">
                  <i
                    className={getSortIconClass(SortField.Died, sort, order)}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const personMother = getParentPerson(people, person.motherName);
          const personFather = getParentPerson(people, person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                selectedSlug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {getParentContent(
                  person.motherName,
                  personMother,
                  searchParams,
                )}
              </td>
              <td>
                {getParentContent(
                  person.fatherName,
                  personFather,
                  searchParams,
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
