import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import InfoWeather from '../interface/InfoWeather';

export default function LineChartWeather(props: InfoWeather) {
    if (!props.itemsIn || props.itemsIn.length === 0) {
        return <div>No data available for the selected option.</div>;
    }

    const keyMapping: { [key: string]: keyof typeof props.itemsIn[0] } = {
        "Precipitación": "precipitation",
        "Humedad": "humidity",
        "Nubosidad": "clouds",
    };

    const key = keyMapping[props.option];
    const xLabels: string[] = props.itemsIn.map((item) => item.dateStart || "Unknown");
    const yData: number[] = props.itemsIn.map((item) => parseFloat(item[key]));

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <LineChart
                height={375}
                series={[
                    { data: yData, label: props.option },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Paper>
    );
}
