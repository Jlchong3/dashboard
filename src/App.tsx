import './App.css';
import Grid from '@mui/material/Grid2';
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import Item from './interface/Item.tsx'

 {/* Hooks */ }
import { useEffect, useState } from 'react';
interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

function App() {
{/* Variable de estado y función de actualización */}
    let [indicators, setIndicators] = useState<Indicator[]>([])
    let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))
    let [items, setItems] = useState<Item[]>([])


{/* Hook: useEffect */}
    useEffect( ()=>{
        let request = async () => {


        {/* Referencia a las claves del LocalStorage: openWeatherMap y expiringTime */}
            let savedTextXML = localStorage.getItem("openWeatherMap") || "";
            let expiringTime = localStorage.getItem("expiringTime");



        {/* Obtenga la estampa de tiempo actual */}
            let nowTime = (new Date()).getTime();

        {/* Verifique si es que no existe la clave expiringTime o si la estampa de tiempo actual supera el tiempo de expiración */}
            if(expiringTime === null || nowTime > parseInt(expiringTime)) {
            {/* Request */}
                let API_KEY = "98fb8ef301729630999f7d4360126e5b"
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
                let savedTextXML = await response.text();

            {/* Tiempo de expiración */}
                let hours = 0.01
                let delay = hours * 3600000
                let expiringTime = nowTime + delay


            {/* En el LocalStorage, almacene el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración */}
                localStorage.setItem("openWeatherMap", savedTextXML)
                localStorage.setItem("expiringTime", expiringTime.toString())
                localStorage.setItem("nowTime", nowTime.toString())

            {/* DateTime */}
                localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
                localStorage.setItem("nowDateTime", new Date(nowTime).toString())

            {/* Modificación de la variable de estado mediante la función de actualización */ }
                setOWM( savedTextXML )
            }

        {/* Valide el procesamiento con el valor de savedTextXML */}
            if( savedTextXML ) {
            {/* XML Parser */}
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

            {/* Arreglo para agregar los resultados */}

                let dataToIndicators : Indicator[] = new Array<Indicator>();
                let dataToItems: Item[] = [];

            {/*
                 Análisis, extracción y almacenamiento del contenido del XML
                 en el arreglo de resultados
             */}

                let name = xml.getElementsByTagName("name")[0].innerHTML || ""
                dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

                let location = xml.getElementsByTagName("location")[1]

                let latitude = location.getAttribute("latitude") || ""
                dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

                let longitude = location.getAttribute("longitude") || ""
                dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

                let altitude = location.getAttribute("altitude") || ""
                dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

                let times = xml.getElementsByTagName("time");

                for (let i = 0; i < 6; i++) {
                    const time = times[i];

                    // Extraer los atributos de la etiqueta <time>
                    var from_date = time.getAttribute("from") || "";
                    var [_, from] = from_date.split('T');

                    var to_date = time.getAttribute("to") || "";
                    var [_, to] = to_date.split('T');

                    // Extraer atributos dentro de la etiqueta <time>
                    const precipitation = time.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "";
                    const humidity = time.getElementsByTagName("humidity")[0]?.getAttribute("value") || "";
                    const clouds = time.getElementsByTagName("clouds")[0]?.getAttribute("all") || "";

                    // Crear un objeto de tipo Item
                    dataToItems.push({
                        dateStart: from,
                        dateEnd: to,
                        precipitation: precipitation,
                        humidity: humidity,
                        clouds: clouds
                    });
                }

            {/* Modificación de la variable de estado mediante la función de actualización */}
                setIndicators( dataToIndicators )
                setItems(dataToItems)
            }
        }

        request();
    }, [owm] )

    let renderIndicators = () => {
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
        <Grid container spacing={5}>
            {/* Indicadores */}
            <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 1'} subtitle={'Unidad 1'} value={"1.23"}/></Grid>
            <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"}/></Grid>
            <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"}/></Grid>
            <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"}/></Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, xl: 8 }}>
                {/* Grid Anidado */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 3 }}>
                        <ControlWeather/>
                    </Grid>
                    <Grid size={{ xs: 12, xl: 9 }}>
                        <TableWeather itemsIn={items}/>
                    </Grid>
                </Grid>
            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, xl: 4 }}>
                <LineChartWeather/>
            </Grid>

        </Grid>
    )
}

export default App
