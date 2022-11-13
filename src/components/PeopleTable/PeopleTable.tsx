import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../../types/Person';
import { PersonList } from '../PersonList';
import { SortTitleTableLink } from '../SortTitleTableLink';
import { sortDataPeople } from '../../utils/sortDataPeople';
import { getFilteredPeople } from '../../utils/getFilteredPeople';

type Props = {
  dataPeople: Person[];
  debounceQuery: string,
};

export const PeopleTable: React.FC<Props> = ({ dataPeople, debounceQuery }) => {
  const { personId = '' } = useParams();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const sortByTitle = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sortableData = useMemo(() => {
    return sortDataPeople(order, dataPeople, sortByTitle);
  }, [dataPeople, sortByTitle, order]);

  const filteredPeople = useMemo(() => {
    return getFilteredPeople(sortableData, debounceQuery, sex, centuries);
  }, [sortableData, debounceQuery, sex, centuries]);

  return (
    (filteredPeople.length > 0)
      ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <SortTitleTableLink name="Name" />
              <SortTitleTableLink name="Sex" />
              <SortTitleTableLink name="Born" />
              <SortTitleTableLink name="Died" />

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>

            {filteredPeople.map(person => (
              <PersonList
                person={person}
                key={person.slug}
                selectedPerson={personId}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )
  );
};
