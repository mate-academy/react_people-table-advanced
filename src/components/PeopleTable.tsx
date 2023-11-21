import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[]
}

const columns = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const personParent = (personName: string | null) => {
    return people.find(person => person.name === personName) || null;
  };

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isSorted = (sortedType: string) => {
    if (sort !== sortedType) {
      return { sort: sortedType, order: null };
    }

    if (sort && !order) {
      return { sort: sortedType, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  if (sort) {
    people.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    people.reverse();
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(columns).map(([type, name]) => (
            <th key={type}>
              <span className="is-flex is-flex-wrap-nowrap">
                {name}
                <SearchLink params={isSorted(type)}>
                  <span className="icon">
                    <i
                      className={cn(
                        'fas',
                        {
                          'fa-sort': sort !== type,
                        },
                        {
                          'fa-sort-up': (sort === type && !order),
                        },
                        {
                          'fa-sort-down': (sort === type && order),
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
        {people.map(person => (
          <tr
            data-cy="person"
            className={cn({ 'has-background-warning': person.slug === slug })}
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                personParent(person.motherName)
                  ? (<PersonLink person={personParent(person.motherName)} />)
                  : (person.motherName || '-')
              }
            </td>
            <td>
              {
                personParent(person.fatherName)
                  ? (<PersonLink person={personParent(person.fatherName)} />)
                  : (person.fatherName || '-')
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
