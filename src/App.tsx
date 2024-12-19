import './App.css';
import Grid from '@mui/material/Grid2';
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import Item from './interface/Item.tsx'
import ControlCity from './components/ControlCity.tsx';

 {/* Hooks */ }
import { useEffect, useState } from 'react';

interface Indicator {
    title?: string;
    subtitle?: string;
    value?: string;
}

function App() {
{/* Variable de estado y función de actualización */}
    const [indicators, setIndicators] = useState<Indicator[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [selectedCity, setSelectedCity] = useState('Guayaquil');
    const [selectedOption, setSelectedOption] = useState('Precipitación');

{/* Hook: useEffect */}
    useEffect( ()=>{
        const request = async () => {

            const API_KEY = "98fb8ef301729630999f7d4360126e5b"
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${API_KEY}`)
            const savedTextXML = await response.text();

        {/* Valide el procesamiento con el valor de savedTextXML */}
        {/* XML Parser */}
            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");

        {/* Arreglo para agregar los resultados */}

            const dataToIndicators : Indicator[] = new Array<Indicator>();
            const dataToItems: Item[] = [];

        {/*
                 Análisis, extracción y almacenamiento del contenido del XML
                 en el arreglo de resultados
             */}

            const name = xml.getElementsByTagName("name")[0].innerHTML || ""
            dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

            const location = xml.getElementsByTagName("location")[1]

            const latitude = location.getAttribute("latitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

            const longitude = location.getAttribute("longitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

            const altitude = location.getAttribute("altitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

            const times = xml.getElementsByTagName("time");

            for (let i = 0; i < 10; i++) {
                const time = times[i];

                // Extraer los atributos de la etiqueta <time>
                const from_date = time.getAttribute("from") || "";
                const [_, from] = from_date.split('T');

                // Extraer atributos dentro de la etiqueta <time>
                const precipitation = time.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "";
                const humidity = time.getElementsByTagName("humidity")[0]?.getAttribute("value") || "";
                const clouds = time.getElementsByTagName("clouds")[0]?.getAttribute("all") || "";

                // Crear un objeto de tipo Item
                dataToItems.push({
                    dateStart: from,
                    precipitation: parseFloat(precipitation) || 0, // Convert to number
                    humidity: parseFloat(humidity) || 0,
                    clouds: parseFloat(clouds) || 0,
                });
            }

        {/* Modificación de la variable de estado mediante la función de actualización */}
            setIndicators(dataToIndicators)
            setItems(dataToItems)
        }

        request();
    }, [selectedCity, selectedOption])

    const handleCityChange = (selected: string) => {
        setSelectedCity(selected);
    }

    const handleOptionChange = (selected: string) => {
        setSelectedOption(selected);
    }

    const renderIndicators = () => {
        return indicators
            .map(
                (indicator, idx) => (
                    <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                        <IndicatorWeather
                            title={indicator["title"]}
                            subtitle={indicator["subtitle"]}
                            value={indicator["value"]} />
                    </Grid>
                )
            )
    }

    return (
        <>
            <h1>Clima en Ecuador</h1>
            <Grid container spacing={5}>
                {/* Indicadores */}
                { renderIndicators() }
                <Grid size={{xs:12, xl: 8}} direction={'column'}>
                    <Grid container paddingBottom={5} spacing={5} direction={'row'}>
                        <Grid size={{xl: 6, xs:6}}>
                            <ControlWeather onOptionChange={handleOptionChange}/>
                        </Grid>
                        <Grid size={{xl: 6, xs:6}}>
                            <ControlCity onCityChange={handleCityChange}/>
                        </Grid>
                    </Grid>
                    <Grid>
                        <LineChartWeather itemsIn={items.slice(0, 6)} option={selectedOption}/>
                    </Grid>
                </Grid>
                {/* Gráfico */}
                <Grid size={{ xs: 12, xl: 4 }}>
                    <TableWeather itemsIn={items} option={null}/>
                </Grid>

            </Grid>
        </>
    )
}

export default App
