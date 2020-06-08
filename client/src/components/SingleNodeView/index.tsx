import React from 'react';
import { GraphDataNode, MCNode, GraphColors } from '../DataViewer';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorCard } from '../Cards/ErrorCard';
import { OverviewBarChart } from '../Cards/OverviewBarChart';
import { TimeLineChart } from '../Cards/TimeLineChart';
import { RootState } from '../../store/rootReducer';
import { setCurrNode } from '../../store/currentNode/actions';
import './styles.scss';

export const SingleNodeView: React.FC = () => {
    const [nodeList, setNodeList] = React.useState<number[]>([]);
    const [liveData, setLiveData] = React.useState<GraphDataNode | null>(null);
    const [timeData, setTimeData] = React.useState<GraphDataNode[] | null>(null);

    const currNode = useSelector((state: RootState) => state.node.currNode);
    const dispatch = useDispatch();

    React.useEffect(() => {
        let timer: any;
        if(timer) { clearInterval(timer) }

        getNodeList();
        getLiveData();
        getTimeData();
        timer = setInterval(getLiveData, 10000);

        return function cleanup() { clearInterval(timer); }
    }, [currNode]);

    /** GET list of all node ids */
    const getNodeList = async () => {
        const res = await fetch(`/api/nodes/list`);
        if(!res.ok) {
            console.error(res.body);
            setNodeList([]);
            return;
        }
        const response: { nodes: number[] } = await res.json();
        setNodeList(response.nodes);
    }

    /** GET live data for a single node */
    const getLiveData = async () => {
        const res = await fetch(`/api/nodes/live/${currNode}`);
        if(!res.ok) {
            console.error(res.body);
            setLiveData(null);
            return;
        }
        const response: MCNode = await res.json();
        setLiveData({
            ...response,
            node_id: response.node_id.toString(),
            cpu_load: parseFloat(response.cpu_load),
            cpu_perc: parseFloat(response.cpu_perc),
        });
    }

    /** get ALL records pertaining to a single node */
    const getTimeData = async () => {
        const res = await fetch(`/api/nodes/${currNode}`);
        if(!res.ok) {
            console.error(res.body);
            setTimeData(null);
            return;
        }
        const response: { nodes: MCNode[] } = await res.json();
        setTimeData(response.nodes.map(node => ({ 
            ...node,
            node_id: node.node_id.toString(),
            cpu_load: parseFloat(node.cpu_load),
            cpu_perc: parseFloat(node.cpu_perc),
        })));
    }
    
    return !liveData || !timeData ? null : (
        <div className='data-container'>
            <Row className='two-thirds'>
                <Col xs={8}>
                    <TimeLineChart data={timeData} toolbar={() => (
                        <div className='toolbar'>
                            <h1>Node {currNode} </h1>
                            <DropdownButton id="dropdown-basic-button" variant="secondary" title="Select node">
                                { nodeList.map(node_id => (
                                    <Dropdown.Item key={node_id} onClick={() => dispatch(setCurrNode(node_id))}>Node {node_id}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </div>
                    )} />
                </Col>
                <Col xs={4}>
                    <OverviewBarChart data={[liveData]} toolbar={() => (
                        <div className='toolbar'>
                            <h1>Stats</h1>
                            <div>
                                <div className='live-dot' />
                                <p>Live</p>
                            </div>
                        </div>
                    )} />
                </Col>
            </Row>
            <Row className="third last">
                <Col xs={6}>
                    <div className="content" style={{ justifyContent: 'space-between', backgroundColor: GraphColors.dark_blue }}>
                        <div className='toolbar'>
                            <h1>Server List</h1>
                            <span style={{ color: 'white' }}><i className="fas fa-hammer"></i></span>
                        </div>
                        <table className='server-table-container'>
                            <tr className="table-row">
                                <th>TYPE</th>
                                <th>ID</th>
                                <th>STATUS</th>
                            </tr>
                            {liveData.mc_servers.map(server => (
                                <tr className="table-row">
                                    <td>Minecraft</td>
                                    <td>{server.slice(2)}</td>
                                    <td>ok</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </Col>
                <Col xs={6}>
                    <ErrorCard count={0} />
                </Col>
                
            </Row>
        </div>
    );
}