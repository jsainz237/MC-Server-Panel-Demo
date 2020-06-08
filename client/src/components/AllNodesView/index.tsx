import React, { PureComponent } from 'react';
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Bar, Legend, Tooltip, Label, LineChart, Line } from 'recharts';
import { GraphDataNode, MCNode, GraphColors } from '../DataViewer';
import { CustomTooltip } from '../CustomTooltip';
import { Row, Col } from 'react-bootstrap';
import './styles.scss';
import { ErrorCard } from '../Cards/ErrorCard';

const now = new Date();
const MOCK_TRAFFIC_DATA = new Array(10).fill(0).map((_, idx) => ({
    players_online: Math.floor(Math.random() * 50) + 10,
    timestamp: new Date().setHours(now.getHours() - idx)
}));

/** Custom component for rendering ticks */
class CustomTick extends PureComponent<any, { hovered: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            hovered: false
        }
    }

    render() {
        const { x, y, payload } = this.props;
        return (
            <g transform={`translate(${x},${y})`} >
                <text cursor="pointer" onMouseEnter={() => this.setState({ hovered: true })} onMouseLeave={() => this.setState({ hovered: false })}
                    fill={this.state.hovered ? '#21b2fa' : 'gray'} x={0} y={0} dy={16} textAnchor="middle">
                    {payload.value}
                </text>
            </g>
        );
    }
}

export const AllNodesView: React.FC = () => {
    const [data, setData] = React.useState<GraphDataNode[] | null>(null);

    React.useEffect(() => {
        getAllNodeData();
        let timer: any = setInterval(getAllNodeData, 10000);
        return function cleanup() { clearInterval(timer); }
    }, []);

    /** Get most recent data for all nodes */
    const getAllNodeData = async () => {
        const res = await fetch('/api/nodes/live');
        if(!res.ok) {
            console.error(res.body);
            setData(null);
            return;
        }
        const response: { nodes: MCNode[] } = await res.json();
        setData(response.nodes.map(node => ({ 
            ...node, 
            node_id: `Node ${node.node_id}`,
            cpu_load: parseFloat(node.cpu_load),
            cpu_perc: parseFloat(node.cpu_perc),
        })));
    }

    const tooltipLabelFormatter = (str: string) => {
        return `Time: ${new Date(str).toLocaleString()}`;
    }

    return !data ? null : (
        <div className='data-container'>
            <Row className='two-thirds'>
                <Col>
                    <div className='content'>
                        <div className='toolbar'>
                            <h1>Overview</h1>
                            <div>
                                <div className='live-dot' />
                                <p>Live</p>
                                <span><i className="fas fa-filter"></i></span>
                            </div>
                        </div>
                        <div className='graph-container'>
                            <ResponsiveContainer width="99%" height="99%">
                                <BarChart style={{ color: 'lightgray' }} data={data}>
                                    <CartesianGrid opacity={0.7} />
                                    <XAxis tick={<CustomTick />} dataKey="node_id" />
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
                </Col>
            </Row>
            <Row className="third last">
                <Col xs={6}>
                    <div className="content">
                        <div className='toolbar'>
                            <h1>Traffic</h1>
                            <div>
                                <span><i className="fas fa-sync-alt"></i></span>
                            </div>
                        </div>
                        <div className="graph-container">
                            <ResponsiveContainer width="99%" height="99%">
                                <LineChart style={{ color: 'lightgray' }} data={MOCK_TRAFFIC_DATA}>
                                    <XAxis dataKey="timestamp" tickFormatter={time => new Date(time).toLocaleTimeString()} />
                                    <YAxis />
                                    <Legend />
                                    //@ts-ignore
                                    <Tooltip content={<CustomTooltip labelFormatter={tooltipLabelFormatter} />} />
                                    <Line type="monotone" dataKey="players_online" stroke={GraphColors.light_orange} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Col>
                <Col xs={6}>
                    <ErrorCard count={3} />
                </Col>
            </Row>
        </div>
    );
}