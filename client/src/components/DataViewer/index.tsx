import React from 'react';
import './styles.scss';
import { AllNodesView } from '../AllNodesView';
import { SingleNodeView } from '../SingleNodeView';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

/** Node attributes interface */
export interface MCNode {
    node_id: number;
    free_ram: string;
    assigned_ram: string;
    free_disk: string;
    used_disk: string;
    cpu_load: string;
    cpu_perc: string;
    mc_servers: string[];
    createdAt: string;
}

export interface GraphDataNode {
    node_id: string;
    free_ram: string;
    assigned_ram: string;
    free_disk: string;
    used_disk: string;
    cpu_load: number;
    cpu_perc: number;
    mc_servers: string[];
}

export const GraphColors = {
    dark_green: '#1b969f',
    light_green: "#28ceda",

    dark_blue: "#075192",
    light_blue: "#0973cf",

    dark_orange: "#f7822a",
    light_orange: "#f9b449"
}

export const DataViewer: React.FC = () => {
    const viewMode = useSelector((state: RootState) => state.view.mode)

    return (
        <div className="data-viewer-container">
            { viewMode === "ALL" ? <AllNodesView /> : <SingleNodeView />}
        </div>
    );
}
