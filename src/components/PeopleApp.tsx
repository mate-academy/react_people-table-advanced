import { PeopleNav } from './PeopleNav';
import { PeopleRouter } from './PeopleRouter/PeopleRouter';

export const PeopleApp = () => {
  return (
    <div data-cy="app">
      <PeopleNav />
      <main className="section">
        <PeopleRouter />
      </main>
    </div>
  );
};
