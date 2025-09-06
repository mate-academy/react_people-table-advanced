import { useSearchParams } from 'react-router-dom';
import { Order, Person, SortType } from '../types';
import { PeopleItem } from './PeopleItem';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

const sectionTable: { label: string; key?: SortType }[] = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Sex',
    key: 'sex',
  },
  {
    label: 'Born',
    key: 'born',
  },
  {
    label: 'Died',
    key: 'died',
  },
  {
    label: 'Mother',
  },
  {
    label: 'Father',
  },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortType | null;
  const order = (searchParams.get('order') as Order) || 'asc';

  function toggleSort(value: SortType | undefined) {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      return;
    }

    if (sort !== value) {
      params.set('sort', value);
    } else if (order === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sectionTable.map(section => (
            <th key={section.label}>
              <span className="is-flex is-flex-wrap-nowrap">
                {section.label}
                {section.key && (
                  <a>
                    <span
                      className="icon"
                      onClick={() => toggleSort(section.key)}
                    >
                      <i
                        className={classNames('fas', {
                          'fa-sort': section.key !== sort,
                          'fa-sort-down':
                            order === 'desc' && section.key === sort,
                          'fa-sort-up': order === 'asc' && section.key === sort,
                        })}
                      />
                    </span>
                  </a>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <PeopleItem people={people} />
    </table>
  );
};
