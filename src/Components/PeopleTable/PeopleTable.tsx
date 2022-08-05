import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Person } from '../../People';
import Filtering from '../Filtering/Filtering';
import TableBody from '../TableBody/TableBody';

type Props = {
  people: Person[],
};

const PeopleTable:React.FC<Props> = ({ people }) => {
  const { userSlug } = useParams();

  const history = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const tableHeadItem = (title: string) => {
    if (sortBy === title) {
      if (sortOrder) {
        return <div className="fas fa-caret-square-up" />;
      }

      return <div className="fas fa-caret-square-down" />;
    }

    return <div className="far fa-caret-square-down" />;
  };

  const sortLink = (title: string) => {
    if (!sortBy || sortBy !== title) {
      searchParams.set('sortBy', title);
      searchParams.delete('sortOrder');
    } else if (!sortOrder) {
      searchParams.set('sortOrder', 'desk');
    } else {
      searchParams.delete('sortBy');
      searchParams.delete('sortOrder');
    }

    history(`?${searchParams.toString()}`);
  };

  let visiblePeople = [...people];

  if (query) {
    const lowerQury = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person => person.name.toLowerCase().includes(lowerQury)
      || person.motherName?.toLowerCase().includes(lowerQury)
      || person.fatherName?.toLowerCase().includes(lowerQury),
    );
  }

  if (sortBy) {
    visiblePeople.sort((a, b) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return a[sortBy].localeCompare(b[sortBy]);

        case 'born':
        case 'died':
          return a[sortBy] - b[sortBy];

        default:
          return 0;
      }
    });
  }

  if (sortOrder) {
    visiblePeople.reverse();
  }

  return (
    <div className="is-flex is-justify-content-center">
      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={() => sortLink('name')}>
              {'Name '}
              {tableHeadItem('name')}
            </th>

            <th onClick={() => sortLink('sex')}>
              {'Sex '}
              {tableHeadItem('sex')}
            </th>

            <th onClick={() => sortLink('born')}>
              {'Born '}
              {tableHeadItem('born')}
            </th>

            <th onClick={() => sortLink('died')}>
              {'Died '}
              {tableHeadItem('died')}
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <tr
              key={person.slug}
              className={classNames('on-hover',
                {
                  'has-background-primary-light': userSlug === person.slug,
                })}
            >
              <TableBody person={person} people={visiblePeople} />
            </tr>
          ))}
        </tbody>
      </table>

      <Filtering />
    </div>
  );
};

export default PeopleTable;
