import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const isSelected = (person: Person) => selectedSlug === person.slug;
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function handleSortChange(field: string) {
    const params = new URLSearchParams(searchParams);

    if (sort === field && !order) {
      params.set('order', 'desc');
    } else if (sort === field && order === 'desc') {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', field);
      params.delete('order');
    }

    setSearchParams(params);
  }

  const sortedPeople = [...people].sort((a, b) => {
    const multiplier = order === 'desc' ? -1 : 1;

    if (sort === 'name') {
      return a.name.localeCompare(b.name) * multiplier;
    }

    if (sort === 'sex') {
      return a.sex.localeCompare(b.sex) * multiplier;
    }

    if (sort === 'born') {
      return (a.born - b.born) * multiplier;
    }

    if (sort === 'died') {
      return (a.died - b.died) * multiplier;
    }

    return 0;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSortChange('name')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th onClick={() => handleSortChange('sex')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th onClick={() => handleSortChange('born')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th onClick={() => handleSortChange('died')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
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
        {sortedPeople.map(pers => {
          const motherPerson = pers.motherName
            ? people.find(p => p.name === pers.motherName)
            : undefined;

          const fatherPerson = pers.fatherName
            ? people.find(p => p.name === pers.fatherName)
            : undefined;

          return (
            <tr
              className={classNames({
                'has-background-warning': isSelected(pers),
              })}
              data-cy="person"
              key={pers.name}
            >
              <td>
                <PersonLink person={pers} />
              </td>

              <td>{pers.sex}</td>
              <td>{pers.born}</td>
              <td>{pers.died}</td>
              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  pers.motherName || '-'
                )}
              </td>
              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  pers.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
