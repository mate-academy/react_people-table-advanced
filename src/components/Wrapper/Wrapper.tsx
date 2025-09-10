import React from 'react';

type Props = {
  children: React.ReactNode;
};
function Wrapper({ children }: Props) {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="column">
          <div className="box table-container">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Wrapper;
