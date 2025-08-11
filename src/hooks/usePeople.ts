import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useNavigate } from 'react-router-dom';
import { Message } from '../types/Message';
import { Person } from '../types/Person';
const REDIRECT_TIME = 3000;

const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<Message | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(res => {
        setPeople(res);
        setDataLoaded(true);
      })
      .catch(() => {
        setError(Message.peopleLoadingError);
        setTimeout(() => navigate('/'), REDIRECT_TIME);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return { people, loading, dataLoaded, error, setError };
};

export default usePeople;
