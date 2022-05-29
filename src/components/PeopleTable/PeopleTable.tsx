import { FC, memo } from 'react';
import shortid from 'shortid';
import { useParams } from 'react-router-dom';
import { HumanWithParents } from '../../types/Human';

import '../../styles/Title.scss';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Array<HumanWithParents>
}

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  // console.log(people);

  return (
    <div className="PeopleTable">
      <h1 className="title">
        PeopleTable
      </h1>
      <table className="table table-warning">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Sex</th>
            <th scope="col">Born</th>
            <th scope="col">Died</th>
            <th scope="col">Mother</th>
            <th scope="col">Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map((human, index) => (
            <PersonRow
              number={index + 1}
              human={human}
              key={shortid.generate()}
              slug={slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
