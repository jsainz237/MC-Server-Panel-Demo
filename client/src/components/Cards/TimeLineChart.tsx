import React from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Label, Legend, Tooltip, Line, LineChart } from 'recharts';
import { GraphColors, GraphDataNode } from '../DataViewer';
import { CustomTooltip } from '../CustomTooltip';

interface BarChartProps {
    data: GraphDataNode[];
    toolbar: () => JSX.Element;
}

export const TimeLineChart: React.FC<BarChartProps> = ({ data, toolbar }) => {
    const tooltipLabelFormatter = (str: string) => {
        return `Time: ${new Date(str).toLocaleString()}`;
    }

    return (
        <div className='content'>
            { toolbar() }
            <div className='graph-container'>
                <ResponsiveContainer width="99%" height="99%">
                    <LineChart style={{ color: 'lightgray' }} data={data}>
                        <CartesianGrid opacity={0.7} />
                        <XAxis dataKey="createdAt" tickFormatter={timestamp => new Date(timestamp).toLocaleString()} />
                        <YAxis yAxisId="left" tickFormatter={num => num === 0 ? '0' : (num/1000).toString() + 'k'} />
                        <YAxis yAxisId="right" tickFormatter={num => num.toString() + '%'} stroke={GraphColors.dark_orange} dataKey="cpu_perc" orientation="right" domain={[0, 100]}>
                            <Label angle={-90} fill='gray' value='CPU' dx={25} />
                        </YAxis>
                        <Legend formatter={(str: string) => <span style={{ marginRight: 20}}>{str.replace('_', ' ')}</span>}/>
                        // @ts-ignore
                        <Tooltip content={<CustomTooltip labelFormatter={tooltipLabelFormatter} /> }/>
                        <Line type="monotone" yAxisId="left" dataKey="assigned_ram" stroke={GraphColors.light_green} />
                        <Line type="monotone" yAxisId="left" dataKey="free_ram" stroke={GraphColors.dark_green}/>
                        <Line type="monotone" yAxisId="left" dataKey="used_disk" stroke={GraphColors.light_blue} />
                        <Line type="monotone" yAxisId="left" dataKey="free_disk" stroke={GraphColors.dark_blue} />
                        <Line type="monotone" yAxisId="right" dataKey="cpu_perc" stroke={GraphColors.dark_orange} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}