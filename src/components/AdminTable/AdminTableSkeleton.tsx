import { FC } from 'react';
import { Skeleton, Tbody, Td, Tr } from '@chakra-ui/react';

const threeRows = Array.from({ length: 3 }, (_, i) => i);
const sevenCols = Array.from({ length: 7 }, (_, i) => i);

const AdminTableSkeleton: FC = () => (
  <Tbody>
    {threeRows.map(row => (
      <Tr key={row}>
        {sevenCols.map(cell => (
          <Td key={cell} height="48px">
            <Skeleton height="8px" />
          </Td>
        ))}
      </Tr>
    ))}
  </Tbody>
);

export default AdminTableSkeleton;
