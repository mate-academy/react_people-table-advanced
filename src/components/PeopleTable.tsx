import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { setNameLink, tabelHead } from '../services/helperData';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(item => item.sex === sex);
    }

    if (query) {
      const queryLower = query.toLowerCase();

      result = result.filter(({ name, motherName, fatherName }) => {
        const nameLower = name.toLowerCase();
        let findName = nameLower.includes(queryLower);

        if (!findName && motherName) {
          findName = motherName.toLowerCase().includes(queryLower);
        }

        if (!findName && fatherName) {
          findName = fatherName.toLowerCase().includes(queryLower);
        }

        return findName;
      });

      if (!result.length) {
        return result;
      }
    }

    if (centuries.length) {
      result = result.filter(item =>
        centuries.includes(`${+item.born.toString().slice(0, 2) + 1}`),
      );
    }

    return result;
  }, [sex, query, centuries, people]);

  const sortedPeople = useMemo(() => {
    if (!filteredPeople.length) {
      return filteredPeople;
    }

    let visiblePeople = filteredPeople;

    visiblePeople = visiblePeople.sort((personA: Person, personB: Person) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);
        case 'born':
        case 'died':
          return personA[sort] - personB[sort];
        default:
          return 0;
      }
    });

    if (order) {
      visiblePeople.reverse();
    }

    return visiblePeople;
  }, [sort, order, filteredPeople]);

  return !sortedPeople.length ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tabelHead.map(name => (
            <th key={name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {setNameLink(name)}
                <SearchLink key={name} params={name}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== name && (order || !order),
                        'fa-sort-up': sort === name && !order,
                        'fa-sort-down': sort === name && order,
                      })}
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
        {sortedPeople.map(person => {
          const {
            born,
            died,
            fatherName,
            motherName,
            sex: personSex,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{personSex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
