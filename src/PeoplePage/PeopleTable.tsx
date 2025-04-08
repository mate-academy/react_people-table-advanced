/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from '../components/SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { SortOption } from "./types";
import { capitalize } from '../utils/helpers';
import cn from 'classnames';

interface Props {
  peopleWithParams: Person[];
  sortParam: string | null;
  sortOrderParam: string | null;
  getSortParam: (value: string) => SearchParams;
}

export const PeopleTable: FC<Props> = ({
  peopleWithParams,
  sortParam,
  sortOrderParam,
  getSortParam,
}) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOption).map(option => {
            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {capitalize(option)}
                  <SearchLink params={getSortParam(option)}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sortParam !== option,
                          'fa-sort-up': sortParam === option && !sortOrderParam,
                          'fa-sort-down':
                            sortParam === option && sortOrderParam,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleWithParams.map(person => {
          const isHighlighted = personSlug === person.slug;

          return (
            <PersonRow
              person={person}
              key={person.slug}
              isHighlighted={isHighlighted}
            />
          );
        })}
      </tbody>
    </table>
  );
};
// </>
//     )}
//   </div>
// </div>
//   );
// };
//--------------------------------------------------------------------
// const [people, setPeople] = useState<Person[]>([]);
// const [isError, setIsError] = useState(false);
// const [isLoading, setIsLoading] = useState(true);

// const fetchPeople = async () => {
//   try {
//     setIsError(false);
//     const peopleFromServer = await getPeople();
//     const peopleWithParents = peopleFromServer.map(person => {
//       return {
//         ...person,
//         mother: peopleFromServer.find(personToFind => {
//           return person.motherName === personToFind.name;
//         }),
//         father: peopleFromServer.find(personToFind => {
//           return person.fatherName === personToFind.name;
//         }),
//       };
//     });

//     setPeople(peopleWithParents);
//   } catch (error) {
//     setIsError(true);
//   } finally {
//     setIsLoading(false);
//   }
// };

// const { personSlug } = useParams();

// useEffect(() => {
//   fetchPeople();
// }, []);

// if (isLoading) {
//   return <Loader />;
// }
