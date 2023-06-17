import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import { findAllVets } from '../service/PetClinicService';

interface Vet {
  id: string;
  firstName: string;
  lastName: string;
  specialties: Specialty[];
}

interface Specialty {
  name: string
}


export const VetList = () => {
  const DEFAULT_NUMBER_ROWS_PER_PAGE:number = 5;
  const [vetList, setVetList] = useState<Vet[]>([{ id: '', firstName: '', lastName: '', specialties: [] }]);

  useEffect(() => {
    findAllVets()
      .then((data) => {
        setVetList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_NUMBER_ROWS_PER_PAGE);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const computeSpecialties = (vet: Vet):string => {
    if (vet.specialties.length > 0) {
      return vet.specialties.map((specialty) => specialty.name).join(', ');
    } else return 'none';
  }

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
            {vetList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vet) => (
              <TableRow key={vet.id}>
                <TableCell>
                  {vet.firstName + " " +vet.lastName}
                </TableCell>
                <TableCell>
                  {computeSpecialties(vet)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
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
