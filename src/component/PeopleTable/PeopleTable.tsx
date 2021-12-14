import React, { useCallback, useEffect, useState } from 'react';
import {
  Link, useNavigate, useSearchParams, useLocation,
} from 'react-router-dom';
import { People } from '../../types/People';
import { THead } from './THead';
import { TrPerson } from './TrPerson';

type Props = {
  peopleServer: People[];
};

enum SortBy {
  Name = 'name',
  Sex = 'sex',
  Died = 'died',
  Born = 'born',
}

const thHeadTitles = ['Name', 'Sex', 'Born', 'Died', 'Father', 'Mother'];
const thHeadOffFilter = ['Father', 'Mother'];

export const PeopleTable: React.FC<Props> = React.memo(({ peopleServer }) => {
  const [showMessage, setShowMessage] = useState(false);

  const [searchParams] = useSearchParams() || '';
  const searchQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setShowMessage(true);

      const wait: Promise<boolean> = new Promise(resolve => {
        setTimeout(() => resolve(false), 5000);
      });

      wait.then((res) => {
        setShowMessage(res);
      });
    }
  }, []);

  let modifyPeople = peopleServer;

  if (searchQuery?.length) {
    modifyPeople = modifyPeople.filter((people: People) => {
      const smallQuery = searchQuery.toLowerCase();

      return people.motherName?.toLowerCase().includes(smallQuery)
        || people.fatherName?.toLowerCase().includes(smallQuery);
    });
  }

  if (sortBy?.length) {
    switch (sortBy) {
      case SortBy.Name:
      case SortBy.Sex:
        switch (sortOrder) {
          case 'asc':
            modifyPeople.sort((a: People, b: People) => (
              a[sortBy].localeCompare(b[sortBy])
            ));
            break;

          case 'desc':
            modifyPeople.sort((a: People, b: People) => (
              b[sortBy].localeCompare(a[sortBy])
            ));
            break;

          default:
            break;
        }

        break;

      case SortBy.Died:
      case SortBy.Born:
        switch (sortOrder) {
          case 'asc':
            modifyPeople.sort((a: People, b: People) => (
              a[sortBy] - b[sortBy]
            ));
            break;

          case 'desc':
            modifyPeople.sort((a: People, b: People) => (
              b[sortBy] - a[sortBy]
            ));
            break;

          default:
            break;
        }

        break;

      default:
        break;
    }
  }

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length > 0) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, []);

  const handleFilter = useCallback((sortMethod: string, selectedSortOrder: string) => {
    if (sortMethod.length > 0) {
      searchParams.set('sortBy', sortMethod);
    } else {
      searchParams.delete('sortBy');
    }

    if (selectedSortOrder.length > 0) {
      searchParams.set('sortOrder', selectedSortOrder);
    } else {
      searchParams.delete('sortOrder');
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [searchQuery]);

  return (
    <>
      {
        showMessage && (
          <div className={`message bg-${state.status}`}>
            <span>{state.message}</span>
          </div>
        )
      }
      <div className="d-flex">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => handleChangeInput(event)}
          placeholder="Search"
          className="form-control"
        />
        <Link
          to="create"
          className="btn btn-primary"
        >
          Create new person
        </Link>
      </div>
      <table className="table">
        <THead
          handleFilter={handleFilter}
          thHeadTitles={thHeadTitles}
          thHeadOffFilter={thHeadOffFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />

        <tbody>
          {
            !modifyPeople.length ? (
              <tr className="text-center fs-4">
                <td colSpan={thHeadTitles.length}>People not found</td>
              </tr>
            ) : (
              modifyPeople.map(person => (
                <TrPerson key={person.slug} person={person} />
              ))
            )
          }
        </tbody>
      </table>
    </>
  );
});
