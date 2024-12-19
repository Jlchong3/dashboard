import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ControlCity({ onCityChange }: { onCityChange: (selected: string) => void }){
{/* Variable de estado y función de actualización */}
    const [selected, setSelected] = useState(0);

{/* Arreglo de objetos */}
    const cities = ['Guayaquil', 'Quito', 'Cuenca'];

{/* Constante de referencia a un elemento HTML */ }

{/* Arreglo de elementos JSX */}
    const options = cities.map((city, key) => <MenuItem key={key} value={key}>{city}</MenuItem>)


{/* Manejador de eventos */}
    const handleChange = (event: SelectChangeEvent) => {
        const idx = parseInt(event.target.value)
        setSelected( idx );
        onCityChange( cities[idx] )
    }

{/* JSX */}
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Typography mb={2} component="h3" variant="h6" color="primary">
                    Ciudades Ecuatorianas
            </Typography>

            <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Ciudades</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        defaultValue='0'
                        onChange={handleChange}
                    >
                        {options}
                    </Select>
                </FormControl>

            </Box>
        </Paper>


    )
}
