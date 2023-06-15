import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PeopleFilters, PeopleTable } from './index';
import { Loader } from '../../Loader/Loader';
import { setPerson } from '../../../utils';
import { getPeople } from '../../../api';
import { Person } from '../../../types';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [showError, setShowError] = useState(false);
  const [showNoPeopleOnTheServer, setShowNoPeopleOnTheServer] = useState(false);

  useEffect(() => {
    getPeople()
      .then((response) => {
        setPeopleList(setPerson(response));
        if (!response.length) {
          setShowNoPeopleOnTheServer(true);
        }
      })
      .catch(() => setShowError(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <TransitionGroup>
              {peopleList.length > 0 && (
                <CSSTransition
                  timeout={500}
                  classNames="item"
                >
                  <PeopleFilters />
                </CSSTransition>
              )}
            </TransitionGroup>
          </div>

          <div className="column">
            <div className="box table-container">
              {!peopleList.length && <Loader />}

              {showError
              && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {showNoPeopleOnTheServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              <PeopleTable peopleList={peopleList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
