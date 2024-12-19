import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item.tsx'
import InfoWeather from '../interface/InfoWeather.tsx';
import { useState,useEffect } from 'react';

export default function BasicTable(props: InfoWeather) {
    const [rows, setRows] = useState<Item[]>([])

    useEffect( ()=> {
        setRows(props.itemsIn)
    }, [props])
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Hora</TableCell>
                        <TableCell align="right">Precipitación</TableCell>
                        <TableCell align="right">Humedad</TableCell>
                        <TableCell align="right">Nubosidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.dateStart}
                            </TableCell>
                            <TableCell align="right">{row.precipitation}</TableCell>
                            <TableCell align="right">{row.humidity}</TableCell>
                            <TableCell align="right">{row.clouds}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
