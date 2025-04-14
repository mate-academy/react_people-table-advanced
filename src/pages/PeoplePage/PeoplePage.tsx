import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/Table/PeopleTable';
import { PeopleFilters } from '../../components/Filter/PeopleFilter';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState(false);

  const renderContent = () => {
    if (errorMessage) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!peopleList) {
      return <Loader />;
    }

    if (!peopleList.length) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return <PeopleTable peopleList={peopleList} />;
  };

  const callGetRequest = async () => {
    try {
      const peopleFromServer = await getPeople();
      const deepCopy = peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer.find(
          mother => mother.name === person.motherName,
        ),
        father: peopleFromServer.find(
          father => father.name === person.fatherName,
        ),
      }));

      setPeopleList(deepCopy);
    } catch {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    callGetRequest();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleList && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
