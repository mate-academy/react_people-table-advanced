import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Person } from './types';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export const Root: React.FC<Props> = (
  {
    people,
    setPeople,
  },
) => {
  return (
    <Routes>
      <Route index element={<h1 className="title">Home Page</h1>} />
      <Route
        path="*"
        element={<h1 className="title">Page not found</h1>}
      />
      <Route
        path="people"
        element={<PeoplePage people={people} setPeople={setPeople} />}
      >
        <Route
          path=":personSlug"
          element={<PeoplePage people={people} setPeople={setPeople} />}
        />
      </Route>
      <Route path="home" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
