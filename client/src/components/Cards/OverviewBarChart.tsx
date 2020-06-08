import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Label, Legend, Bar, Tooltip } from 'recharts';
import { GraphColors, GraphDataNode } from '../DataViewer';
import { CustomTooltip } from '../CustomTooltip';

interface BarChartProps {
    data: GraphDataNode[];
    toolbar: () => JSX.Element;
}

export const OverviewBarChart: React.FC<BarChartProps> = ({ data, toolbar }) => {
    return (
        <div className='content'>
            { toolbar() }
            <div className='graph-container'>
                <ResponsiveContainer width="99%" height="99%">
                    <BarChart style={{ color: 'lightgray' }} data={data}>
                        <CartesianGrid opacity={0.7} />
                        <XAxis dataKey="node_id" tickFormatter={str => `Node ${str}`} />
                        <YAxis yAxisId="left" tickFormatter={num => num === 0 ? '0' : (num/1000).toString() + 'k'} />
                        <YAxis yAxisId="right" tickFormatter={num => num.toString() + '%'} stroke={GraphColors.dark_orange} dataKey="cpu_perc" orientation="right" domain={[0, 100]}>
                            <Label angle={-90} fill='gray' value='CPU' dx={25} />
                        </YAxis>
                        <Legend formatter={(str: string) => <span style={{ marginRight: 20}}>{str.replace('_', ' ')}</span>}/>
                        // @ts-ignore
                        <Tooltip content={<CustomTooltip /> }/>
                        <Bar yAxisId="left" dataKey="assigned_ram" stackId="a" fill={GraphColors.light_green} />
                        <Bar yAxisId="left" dataKey="free_ram" stackId="a" fill={GraphColors.dark_green}/>
                        <Bar yAxisId="left" dataKey="used_disk" stackId="b" fill={GraphColors.light_blue} />
                        <Bar yAxisId="left" dataKey="free_disk" stackId="b" fill={GraphColors.dark_blue} />
                        <Bar yAxisId="right" dataKey="cpu_perc" fill={GraphColors.dark_orange} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}