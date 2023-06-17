import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { findAllOwners } from '../service/PetClinicService';

interface Owner {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  telephone: string
}

export const OwnerList = () => {
  const DEFAULT_NUMBER_ROWS_PER_PAGE:number = 5;
  const [ownerList, setOwnerList] = useState<Owner[]>([{ id: '', firstName: '', lastName: '', address: '', city: '', telephone: '' },]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_NUMBER_ROWS_PER_PAGE);

  useEffect(() => {
    findAllOwners()
      .then((data) => {
        setOwnerList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ownerList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>
                    {owner.firstName + " " +owner.lastName}
                  </TableCell>
                  <TableCell>{owner.address}</TableCell>
                  <TableCell>{owner.city}</TableCell>
                  <TableCell>{owner.telephone}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={ownerList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
