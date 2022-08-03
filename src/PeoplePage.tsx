import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const { personSlug } = useParams();

  return (
    <div className="People">
      <h2 className="People">People page</h2>
      <PeopleTable personSlug={personSlug} />
    </div>
  );
};
