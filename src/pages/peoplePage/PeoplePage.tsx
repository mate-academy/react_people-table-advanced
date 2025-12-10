import { PeopleProvider } from './model';
import { PeopleMain } from './ui/PeopleMain';

export const PeoplePage = () => {
  return (
    <PeopleProvider>
      <PeopleMain />
    </PeopleProvider>
  );
};
