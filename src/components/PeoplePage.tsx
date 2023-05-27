import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { WarningType } from '../types/WarningType';
import { WarningMessage } from './WarningMessage';
import {
  getFullPeopleList,
  preparePeopleList,
} from '../utils/peopleListHelper';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);
  const [warningMessage, setWarningMessage] = useState(WarningType.NONE);
  const [searchParams] = useSearchParams();

  const extendPeopleList = useCallback(async () => {
    setWarningMessage(WarningType.NONE);

    try {
      const peopleListWithParents = await getFullPeopleList();

      setPeopleList(peopleListWithParents);
    } catch {
      setWarningMessage(WarningType.SERVER);
    }
  }, []);

  useEffect(() => {
    extendPeopleList();
  }, []);

  useEffect(() => {
    if (peopleList && peopleList.length === 0) {
      setWarningMessage(WarningType.NOPEOPLE);
    }
  }, [peopleList]);

  const preparedPeopleList = useMemo(() => {
    setWarningMessage(WarningType.NONE);

    const preparedList = preparePeopleList(peopleList, searchParams);

    if (preparedList && preparedList.length === 0) {
      setWarningMessage(WarningType.NOMATCHES);

      return [];
    }

    return preparedList;
  }, [peopleList, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {preparedPeopleList || warningMessage
                ? (
                  <>
                    {preparedPeopleList && !warningMessage
                      ? <PeopleTable people={preparedPeopleList} />
                      : <WarningMessage message={warningMessage} />}
                  </>
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
