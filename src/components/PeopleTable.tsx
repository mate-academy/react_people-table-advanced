import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(n => (
            <th key={n}>
              <span className="is-flex is-flex-wrap-nowrap">
                {n}
                <SearchLink
                  children={
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== n.toLowerCase(),
                          'fa-sort-up': sort === n.toLowerCase() && !order,
                          'fa-sort-down': sort === n.toLowerCase() && order,
                        })}
                      />
                    </span>
                  }
                  params={
                    sort === n.toLowerCase()
                      ? order
                        ? { order: null, sort: null }
                        : { order: 'desc' }
                      : { sort: n.toLowerCase(), order: null }
                  }
                />
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
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            data-cy="person"
          >
            <td>
              <PersonLink search={searchParams} person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink search={searchParams} person={person.mother} />
              ) : (
                (person.motherName ?? '-')
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink search={searchParams} person={person.father} />
              ) : (
                (person.fatherName ?? '-')
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
