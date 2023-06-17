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
} from '@material-ui/core';
import PetService from '../service/PetClinicService';

const Owners = () => {
  const [owners, setOwners] = useState([
    { id: '', firstName: '', lastName: '', address: '', city: '', phone: '' },
  ]);

  const petService = new PetService();

  useEffect(() => {
    petService
      .findAllOwners()
      .then((data) => {
        setOwners(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
            {owners
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>
                    {owner.firstName} {owner.lastName}
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
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={owners.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Owners;
