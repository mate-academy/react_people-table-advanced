/* eslint-disable no-console */
import { useSearchParams } from 'react-router-dom';

export const NotFoundPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('query: ', searchParams.getAll('query'));
  console.log('age: ', searchParams.getAll('age'));

  return (
    <>
      <h1 className="title">Page not found</h1>
      <h3>Query search Param</h3>
      <input
        type="text"
        value={searchParams.get('query') || ''}
        onChange={({ target }) => {
          switch (target.value.length) {
            case 0:
              searchParams.delete('query');
              break;
            default:
              searchParams.set('query', target.value);
          }

          setSearchParams(searchParams);
        }}
      />
      <h3>age search Param</h3>
      <input
        type="text"
        value={searchParams.get('age') || ''}
        onChange={({ target }) => {
          switch (target.value.length) {
            case 0:
              searchParams.delete('age');
              break;
            default:
              searchParams.set('age', target.value);
          }

          setSearchParams(searchParams);
        }}
      />
      <h2 className="title">{`searchParams: ${searchParams.toString() || 'None!'}`}</h2>
      <h2 className="title">{`query: ${searchParams.getAll('query').toString() || 'None!'}`}</h2>
      <h2 className="title">{`age: ${searchParams.getAll('age').toString() || 'None!'}`}</h2>
      <h2 className="title">
        {
          // eslint-disable-next-line no-restricted-globals
          location.toString()
        }

      </h2>
    </>

  );
};
