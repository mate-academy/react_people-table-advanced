import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { filterPeople } from '../utils';
import {
  Loader,
  NoPeopleMessage,
  PeopleLoadingError,
  PeoplePageContent,
} from '../components';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    (async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setPeople(await getPeople());
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const listOfPeople = filterPeople(people, sex, query, centuries, sort, order);

  const componentForRender = () => {
    switch (true) {
      case isError:
        return <PeopleLoadingError />;
      case !people.length:
        return <NoPeopleMessage />;
      default:
        return <PeoplePageContent people={listOfPeople} />;
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          {isLoading ? <Loader /> : componentForRender()}
        </div>
      </div>
    </div>
  );
};
