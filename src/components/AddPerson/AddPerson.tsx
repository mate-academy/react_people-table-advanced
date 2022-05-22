import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPerson.scss';

const AddPerson: React.FC = () => {
  const navigate = useNavigate();

  const showAddNewPersonForm = () => {
    navigate('/react_people-table-advanced/people/new');
  };

  return (
    <button
      className="AddPersonEntrance"
      type="button"
      onClick={showAddNewPersonForm}
    >
      Add new person
    </button>
  );
};

export default AddPerson;
