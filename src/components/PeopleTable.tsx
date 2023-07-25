import {
  NavLink,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type State = {
  people: Person[],
};

const ORDER_DESC = 'desc';

export const PeopleTable: React.FC<State> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? '';
  const order = searchParams.get('order') ?? '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(th => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {th}
                <SearchLink
                  key={th}
                  params={{
                    sort: sort === th && order === ORDER_DESC
                      ? null
                      : th,
                    order: sort === th && order !== ORDER_DESC
                      ? ORDER_DESC
                      : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas', {
                          'fa-sort': sort !== th,
                          'fa-sort-up': sort === th && order !== ORDER_DESC,
                          'fa-sort-down': sort === th && order === ORDER_DESC,
                        },
                      )}
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
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}`}
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
                {person.mother ? (
                  <NavLink
                    to={`/people/${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </NavLink>
                ) : person.motherName}
              </td>
              <td>
                {person.father ? (
                  <NavLink to={`/people/${person.father.slug}`}>
                    {person.fatherName}
                  </NavLink>
                ) : person.fatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
