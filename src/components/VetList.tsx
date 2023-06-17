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

const VetList = () => {
  const [vetList, setVetList] = useState([
    { id: '', firstName: '', lastName: '', specialties: [] },
  ]);

  const petService = new PetService();

  useEffect(() => {
    petService
      .findAllVets()
      .then((data) => {
        setVetList(data);
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
              <TableCell>Specialties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vetList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vet) => (
                <TableRow key={vet.id}>
                  <TableCell>
                    {vet.firstName} {vet.lastName}
                  </TableCell>
                  <TableCell>{vet.specialties.length > 0 ? vet.specialties.map(specialty => specialty.name).join(', ') : 'none'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={vetList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default VetList;
