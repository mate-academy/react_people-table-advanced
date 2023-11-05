import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sortCriterion = ['Name', 'Sex', 'Born', 'Died'];

  const compareFunction = (a: Person, b: Person) => {
    if (sort === 'name') {
      return (order === 'desc')
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }

    if (sort === 'sex') {
      return (order === 'desc')
        ? b.sex.localeCompare(a.sex)
        : a.sex.localeCompare(b.sex);
    }

    if (sort === 'born') {
      return (order === 'desc') ? b.born - a.born : a.born - b.born;
    }

    if (sort === 'died') {
      return (order === 'desc') ? b.died - a.died : a.died - b.died;
    }

    return 0;
  };

  const handleSort = (selectedSort: string) => {
    if (selectedSort !== sort) {
      return {
        sort: selectedSort,
        order: null,
      };
    }

    if (selectedSort === sort && !order) {
      return {
        sort: selectedSort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const sortedPeople = [...people].sort(compareFunction);

  const getPersonByName = (name: string) => {
    return people.find((person) => person.name === name);
  };

  const { slug } = useParams();

  return (
    <>
      {sortedPeople.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {sortCriterion.map((criterion) => {
                const criterionLower = criterion.toLowerCase();

                return (
                  <>
                    <th key={criterion}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {criterion}
                        <SearchLink params={handleSort(criterionLower)}>
                          <span className="icon">
                            <i
                              className={classNames('fas', {
                                'fa-sort': sort !== criterionLower,
                                'fa-sort-up': sort === criterionLower
                                && order,
                                'fa-sort-down': sort === criterionLower
                                && !order,
                              })}
                            />
                          </span>
                        </SearchLink>
                      </span>
                    </th>

                  </>
                );
              })}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map((person) => {
              const mother = person.motherName
                ? getPersonByName(person.motherName) : null;

              const father = person.fatherName
                ? getPersonByName(person.fatherName) : null;

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': person.slug === slug,
                  })}
                >
                  <td>
                    <PeopleLink person={person} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {mother ? <PeopleLink person={mother} />
                      : person.motherName || '-'}
                  </td>
                  <td>
                    {father ? <PeopleLink person={father} />
                      : person.fatherName || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
