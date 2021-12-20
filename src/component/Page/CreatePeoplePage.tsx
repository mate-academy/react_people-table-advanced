import React from 'react';
import { NewPerson } from '../Forms/NewPerson';
import { MoveBackBtn } from '../MoveBackBtn/MoveBackBtn';

export const CreatePeoplePage: React.FC = () => {
  return (
    <>
      <div className="d-flex mb-5">
        <MoveBackBtn />
        <h1 className="ms-4">Create People</h1>
      </div>
      <NewPerson />
    </>
  );
};
