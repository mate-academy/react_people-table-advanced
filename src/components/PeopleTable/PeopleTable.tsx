/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleRow } from '../PersonRow';
import { useMemo } from 'react';

type Props = {
  people: Person[];
};

type SearchParams = {
  queryParam: string;
  centuriesParam: string[];
  peopleSexParam: string;
};

function filterPeopleBySearchParams(
  peopleList: Person[],
  { queryParam, centuriesParam, peopleSexParam }: SearchParams,
) {
  const queryInLowerCase = queryParam.toLowerCase();

  return peopleList.filter(person => {
    const personCentury = (+person.born.toString().slice(0, 2) + 1).toString();

    return (
      person.name.toLowerCase().includes(queryInLowerCase) &&
      person.sex.includes(peopleSexParam) &&
      (centuriesParam.length > 0
        ? centuriesParam.includes(personCentury)
        : true)
    );
  });
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const peopleSex = useMemo(() => {
    return searchParams.get('sex') || '';
  }, [searchParams]);
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);
  const query = useMemo(() => {
    return searchParams.get('query') || '';
  }, [searchParams]);

  const filteredPeople = useMemo(() => {
    return filterPeopleBySearchParams(people, {
      queryParam: query,
      centuriesParam: centuries,
      peopleSexParam: peopleSex,
    });
  }, [centuries, people, peopleSex, query]);

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PeopleRow
            personToRender={person}
            people={people}
            slug={slug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
