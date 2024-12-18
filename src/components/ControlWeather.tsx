import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

 {/* Hooks */ }
 import { useState } from 'react';

export default function ControlWeather({ onOptionChange }: { onOptionChange: (selected: string) => void }) {

{/* Variable de estado y función de actualización */}
    const [selected, setSelected] = useState(0)

{/* Arreglo de objetos */}
    const items = [
        "Precipitación",
        "Humedad",
        "Nubosidad"
    ]

{/* Constante de referencia a un elemento HTML */ }
{/* Arreglo de elementos JSX */}
    const options = items.map((item, key) => <MenuItem key={key} value={key}>{item}</MenuItem>)


{/* Manejador de eventos */}
    const handleChange = (event: SelectChangeEvent) => {
        const idx = parseInt(event.target.value)
        setSelected( idx );
        onOptionChange( items[idx] )
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
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
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
