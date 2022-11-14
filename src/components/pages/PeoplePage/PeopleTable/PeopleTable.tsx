import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../../../types/Person';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findParent = (personName: string | null) => {
    const parent = people.find(person => person.name === personName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return personName || '-';
  };

  const filterPeople = () => {
    let newPeople = people;

    if (sex) {
      newPeople = newPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();

      newPeople = newPeople.filter(
        person => {
          const personNames = person.name
            + person.fatherName + person.motherName;

          return personNames.toLowerCase().includes(lowerQuery);
        },
      );
    }

    if (centuries.length) {
      newPeople = newPeople.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(personCentury.toString());
      });
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          newPeople = newPeople.sort((a, b) => {
            if (!order) {
              return a[sort].localeCompare(b[sort]);
            }

            return b[sort].localeCompare(a[sort]);
          });
          break;
        case 'died':
        case 'born':
          newPeople = newPeople.sort((a, b) => {
            if (!order) {
              return +a[sort] - +b[sort];
            }

            return +b[sort] - +a[sort];
          });
          break;
        default:
          break;
      }
    }

    return newPeople;
  };

  useEffect(() => {
    setFilteredPeople(filterPeople());
  }, [people, sex, query, centuries, sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className={'table is-striped is-hoverable'
        + 'is-narrow is-fullwidth'}
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={{
                  sort: !sort || !order ? 'name' : null,
                  order: sort && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sort !== 'name' && <i className="fas fa-sort" />}
                  {sort === 'name'
                    && !order && <i className="fas fa-sort-down" />}
                  {sort === 'name'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: !sort || !order ? 'sex' : null,
                  order: sort && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sort !== 'sex' && <i className="fas fa-sort" />}
                  {sort === 'sex'
                    && !order && <i className="fas fa-sort-down" />}
                  {sort === 'sex'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: !sort || !order ? 'born' : null,
                  order: sort && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sort !== 'born' && <i className="fas fa-sort" />}
                  {sort === 'born'
                    && !order && <i className="fas fa-sort-down" />}
                  {sort === 'born'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: !sort || !order ? 'died' : null,
                  order: sort && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  {sort !== 'died' && <i className="fas fa-sort" />}
                  {sort === 'died'
                    && !order && <i className="fas fa-sort-down" />}
                  {sort === 'died'
                    && order && <i className="fas fa-sort-up" />}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
