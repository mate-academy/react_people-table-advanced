import classNames from 'classnames';
import {
  NavLink,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { Search } from '../types/searchEnum';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findParent = (parentName: string | null) => {
    return people.find(person => person.name === parentName) || null;
  };

  const handleSortSearch = (type: Search) => {
    if (!sort || sort !== type) {
      return { sort: type, order: null };
    }

    if (!order) {
      return { sort: type, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const handleArrowChange = (field: string) => {
    return classNames('fa fa-sort', {
      'fa-sort-up': sort === field && !order,
      'fa-sort-down': sort === field && order,
    });
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
                params={handleSortSearch(Search.Name)}
              >
                <span className="icon">
                  <i className={handleArrowChange(Search.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortSearch(Search.Sex)}>
                <span className="icon">
                  <i className={handleArrowChange(Search.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortSearch(Search.Born)}>
                <span className="icon">
                  <i className={handleArrowChange(Search.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortSearch(Search.Died)}>
                <span className="icon">
                  <i className={handleArrowChange(Search.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findParent(person.motherName);
          const father = findParent(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}?${searchParams.toString()}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </NavLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <NavLink
                    to={`/people/${mother.slug}?${searchParams.toString()}`}
                    className="has-text-danger"
                  >
                    {person.motherName || '-'}
                  </NavLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <NavLink to={`/people/${father.slug}?${searchParams.toString()}`}>
                    {person.fatherName || '-'}
                  </NavLink>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
