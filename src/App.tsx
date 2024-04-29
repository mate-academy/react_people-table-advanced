import './App.scss';
import { PeopleApp } from './components/PeopleApp';
import { PeopleContextProvider } from './components/PeopleContext';

export const App = () => {
  return (
    <PeopleContextProvider>
      <PeopleApp />
    </PeopleContextProvider>
  );
};
