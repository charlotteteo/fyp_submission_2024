import { Gauge } from '@ant-design/plots';
function GaugeChart({title,percent}){
    const gauge_config = {
        percent: percent,
        range: {
        color: '#0958D9',
        },
        indicator: {
        pointer: {
            style: {
            stroke: '#D0D0D0',
            },
        },
        pin: {
            style: {
            stroke: '#D0D0D0',
            },
        },
        },
        axis: {
        label: {
            formatter(v) {
            return Number(v) * 100;
            },
        },
        subTickLine: {
            count: 3,
        },
        },
        statistic: {
        content: {
            formatter: ({ percent }) => title,
            // formatter: title,
            style: {
            // color: 'rgba(0,0,0,0.65)',
            fontSize: 20,
            },
        },
        },
    };
    return <Gauge {...gauge_config}/>;

}
export default GaugeChart;
