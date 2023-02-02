/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
};

type Params = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const params: Params[] = ['name', 'sex', 'born', 'died'];
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');
  const visiblePeople = [...people];

  const sortPeople = () => {
    visiblePeople.sort((a, b) => {
      const [personA, personB] = order === 'desc'
        ? [b, a]
        : [a, b];

      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);

        case 'born':
        case 'died':
          return personA[sort] - personB[sort];

        default: return 0;
      }
    });
  };

  const handleClick = (param: string) => {
    sortPeople();
    switch (true) {
      case sort !== param:
        return () => {
          searchParams.set('sort', param);
          searchParams.delete('order');
          setSearchParams(searchParams);
        };

      case order === 'desc':
        return () => {
          searchParams.delete('order');
          searchParams.delete('sort');
          setSearchParams(searchParams);
        };

      default: return () => {
        searchParams.set('order', 'desc');
        setSearchParams(searchParams);
      };
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {params.map(param => (
            <th key={param}>
              <span className="is-flex is-flex-wrap-nowrap">
                {param[0].toUpperCase() + param.slice(1)}
                <Link to={`/people${search}`}>
                  <span
                    className="icon"
                    onMouseDown={handleClick(param)}
                  >
                    <i
                      className={cn('fas fa-sort', {
                        'fa-sort-up': !order && sort === param,
                        'fa-sort-down': order && sort === param,
                      })}
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
        {(sort ? visiblePeople : people).map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

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
