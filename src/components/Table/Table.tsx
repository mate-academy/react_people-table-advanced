import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {

  people: Person[] | undefined

}

export const Table: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const parent = (parentName: string | null) => {
    return people?.find(pPerson => pPerson.name === parentName);
  };

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortToggle = (sortType: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== sortType) {
      params.set('sort', sortType);

      return params.toString();
    }

    if (sort === sortType && order === 'desc') {
      params.delete('sort');
      params.delete('order');

      return params.toString();
    }

    params.set('sort', sortType);
    params.set('order', 'desc');

    return params.toString();
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
              <Link to={{ search: sortToggle('name') }}>
                <span className="icon">
                  <i className={cn(
                    'fas',
                    {
                      'fa-sort': sort !== 'name',
                      'fa-sort-down': (sort === 'name' && order === 'desc'),
                      'fa-sort-up': sort === 'name' && order !== 'desc',
                    },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: sortToggle('sex') }}>
                <span className="icon">
                  <i className={cn(
                    'fas',
                    {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-down': (sort === 'sex' && order === 'desc'),
                      'fa-sort-up': sort === 'sex' && order !== 'desc',
                    },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: sortToggle('born') }}>
                <span className="icon">
                  <i className={cn(
                    'fas',
                    {
                      'fa-sort': sort !== 'born',
                      'fa-sort-down': (sort === 'born' && order === 'desc'),
                      'fa-sort-up': sort === 'born' && order !== 'desc',
                    },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: sortToggle('died') }}>
                <span className="icon">
                  <i className={cn(
                    'fas',
                    {
                      'fa-sort': sort !== 'died',
                      'fa-sort-down': (sort === 'died' && order === 'desc'),
                      'fa-sort-up': sort === 'died' && order !== 'desc',
                    },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people?.map(person => {
          const selected = person.slug === slug;

          return (

            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': selected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  parent(person.motherName)
                    ? (<PersonLink person={parent(person.motherName)} />)
                    : (<p>{person.motherName || '-'}</p>)
                }
              </td>
              <td>
                {
                  parent(person.fatherName)
                    ? (<PersonLink person={parent(person.fatherName)} />)
                    : (<p>{person.fatherName || '-'}</p>)
                }
              </td>
            </tr>

          );
        })}
      </tbody>
    </table>

  );
};
