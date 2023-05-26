import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';
import { getSortedPeople } from '../../utils/peopleSorter';
import { SortType } from '../../types/SortType';
import { SortingLink } from '../SortingLink';

interface Props {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable:React.FC<Props> = ({ people, selectedPersonSlug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort' || '');
  const order = searchParams.get('order' || '');

  const sortingTypes = Object.values(SortType);
  const sortedPeople = getSortedPeople(people, sort as SortType, !!order);

  return (
    <table
      data-cy="peopleTable"
      // eslint-disable-next-line max-len
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >

      <thead>
        <tr>
          {sortingTypes.map(sortType => (
            <SortingLink
              key={sortType}
              sortType={sortType}
              selectedSortType={sort as SortType}
              order={order}
              searchParams={searchParams}
            />
          ))}

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const { slug } = person;
          const isSelected = selectedPersonSlug === slug;

          const mother = people
            .find(parent => parent.name === person.motherName);

          const father = people
            .find(parent => parent.name === person.fatherName);

          const personWithParentsLinks = { ...person, mother, father };

          return (
            <PersonInfo
              key={slug}
              person={personWithParentsLinks}
              isSelected={isSelected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
