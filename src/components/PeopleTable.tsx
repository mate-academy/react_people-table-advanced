import { Person } from '../types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: urlSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePersonClick = (slug: string) => {
    navigate(`/people/${slug}`, { replace: true });
  };

  const handleSort = (field: keyof Person) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    let newOrder: 'asc' | 'desc' | null = 'asc';

    if (currentSort === field) {
      if (currentOrder === 'asc') {
        newOrder = 'desc';
      } else if (currentOrder === 'desc') {
        newOrder = null;
      }
    }

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams.toString());

      if (newOrder === null) {
        newParams.delete('sort');
        newParams.delete('order');
      } else {
        newParams.set('sort', field);
        if (newOrder === 'desc') {
          newParams.set('order', 'desc');
        } else {
          newParams.delete('order');
        }
      }

      return newParams;
    });
  };

  const columnsName = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnsName.map(columnName => (
            <th key={columnName}>
              <span
                onClick={() =>
                  handleSort(columnName.toLowerCase() as keyof Person)
                }
              >
                {columnName}
                {searchParams.get('sort') === columnName.toLowerCase() && (
                  <span>
                    {searchParams.get('order') === 'desc' ? ' 🔽' : ' 🔼'}
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            people={people}
            handlePersonClick={handlePersonClick}
            selectedPerson={urlSlug || null}
          />
        ))}
      </tbody>
    </table>
  );
};
