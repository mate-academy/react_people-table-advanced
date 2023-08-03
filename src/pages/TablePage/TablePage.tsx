import { useParams } from 'react-router-dom';
import { Table } from '../../components/Table';

export const TablePage = () => {
  const { selectedSlug } = useParams();

  return (
    <Table selectedSlug={selectedSlug} />
  );
};
