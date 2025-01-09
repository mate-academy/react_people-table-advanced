import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonExistLink } from './PersonExistLink';
import { getSearchWith } from '../utils/searchHelper';
import { getUpperFirstChar } from '../utils/methods';
import cl from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
  peopleFromAPI: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people, peopleFromAPI }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isExist = (value: string) => {
    const person = peopleFromAPI.find(p => p.name === value);

    return person ? <PersonExistLink person={person} /> : value;
  };

  const sortByValue = (value: string) => {
    if (!sort || (sort && sort !== value)) {
      return getSearchWith(searchParams, { sort: value, order: null });
    } else if (sort && sort == value && !order) {
      return getSearchWith(searchParams, { order: 'desc' });
    } else {
      return getSearchWith(searchParams, { order: null, sort: null });
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(v => (
            <th key={v}>
              <span className="is-flex is-flex-wrap-nowrap">
                {getUpperFirstChar(v)}
                <Link to={`?${sortByValue(v)}`}>
                  <span className="icon">
                    <i
                      className={cl('fas', {
                        'fa-sort': !sort || sort !== v,
                        'fa-sort-up': sort && !order && sort === v,
                        'fa-sort-down': sort && order && sort === v,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          {/* "fas fa-sort" */}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(p => (
          <tr
            key={p.name}
            data-cy="person"
            className={slug === p.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonExistLink person={p} />
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>{p.motherName ? isExist(p.motherName) : '-'}</td>
            <td>{p.fatherName ? isExist(p.fatherName) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
