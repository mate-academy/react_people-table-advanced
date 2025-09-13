import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader/Loader';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';

export const ShowPeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => res.json())
      .then(data => setPeople(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (people.length === 0) {
    return <p>There are no people on the server</p>;
  }

  const selectedPerson = people.find(p => p.slug === slug) || null;

  return (
    <div className="container">
      <PeopleTable people={people} selectedPerson={selectedPerson} />
    </div>
  );
};
