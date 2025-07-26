import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  isloading: boolean;
  people: Person[];
  selectedSlug: string;
  params: {
    sort: string | null;
    order: string | null;
    sex: string | null;
    centuries: string[];
    query: string | null;
    born: string | null;
    died: string | null;
  };
};

const itensHeaders = [
  { name: 'Name' },
  { name: 'Sex' },
  { name: 'Born' },
  { name: 'Died' },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({
  isloading,
  people,
  selectedSlug,
  params,
}: PeopleTableProps) => {
  if (isloading) {
    return <Loader />;
  }

  const paramsSort = (columnName: keyof Person) => {
    // Se não está ordenando por esta coluna OU está ordenando por outra coluna
    if (params.sort !== columnName) {
      return {
        sort: columnName,
        order: null, // <- Ascendente (padrão)
      };
    }

    // Se está ordenando por esta coluna e order é null (ascendente)
    if (params.sort === columnName && params.order === null) {
      return {
        sort: columnName,
        order: 'desc', // <- Muda para descendente
      };
    }

    // Se está ordenando por esta coluna e order é 'desc' (descendente)
    if (params.sort === columnName && params.order === 'desc') {
      return {
        sort: null,
        order: null, // <- Remove ordenação (normal)
      };
    }

    // Fallback
    return {
      sort: columnName,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {itensHeaders.map(item => (
            <th key={item.name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {item.name}
                <SearchLink
                  params={paramsSort(item.name.toLowerCase() as keyof Person)}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
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
            key={person.name}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} allPeople={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName || ''} allPeople={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName || ''} allPeople={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
