import { CronJob } from 'cron';
// import axios, { AxiosResponse, AxiosError } from 'axios';
import MCNode, { MCNodeAttr } from '../models/mcnode';

/** 
 * example data that mocks actual data that would be given from company's example endpoint.
 * This was not used in the technical interview, only my personal copy.
 */
export const EXAMPLE_DATA: { nodes: MCNodeAttr[], guuid: string } = {
    "nodes": [
        {
            "node_id": 1122,
            "free_ram": "26148",
            "assigned_ram": "64000",
            "free_disk": "372333",
            "used_disk": "127667",
            "cpu_load": "1.4",
            "cpu_perc": "57",
            "mc_servers": [
                "mc723",
                "mc925",
                "mc1257",
                "mc5321"
            ]
        },
        {
            "node_id": 7263,
            "free_ram": "60148",
            "assigned_ram": "67000",
            "free_disk": "372333",
            "used_disk": "127667",
            "cpu_load": "4.6",
            "cpu_perc": "37",
            "mc_servers": [
                "mc623",
                "mc925",
                "mc2257",
                "mc7321"
            ]
        },
        {
            "node_id": 3719,
            "free_ram": "62548",
            "assigned_ram": "128000",
            "free_disk": "269214",
            "used_disk": "213543",
            "cpu_load": "60.1",
            "cpu_perc": "100",
            "mc_servers": [
                "mc623",
                "mc325",
                "mc3257",
                "mc8321"
            ]
        },
        {
            "node_id": 9145,
            "free_ram": "90548",
            "assigned_ram": "128000",
            "free_disk": "269214",
            "used_disk": "213543",
            "cpu_load": "60.5",
            "cpu_perc": "100",
            "mc_servers": [
                "mc3213",
                "mc12455",
                "mc3257",
                "mc8431"
            ]
        }
    ],
    "guuid": "95f8f9fcf2744bddaf7a0e851eb2f4e7"
}

export interface ResponseBody {
    nodes: MCNode[];
    guuid: string;
}

/** 
 * FOR TECHNICAL INTERVIEW: make GET request to example endpoint to retrieve node statistics at that point in time
 * 
 * FOR PERSONAL COPY: save example data to database
 */
function saveNodeData() {
    console.log('saved node data');

    // TECHNICAL INTERVIEW
    // axios.get('COMPANY_MOCK_ENDPOINT')
    //     .then((res: AxiosResponse<ResponseBody>) => {
    //         // on success, insert all nodes into database w/ a timestamp
    //         MCNode.bulkCreate(res.data.nodes);
    //     })
    //     .catch((err: AxiosError) => {
    //         // on error print stack
    //         console.log(err.stack);
    //     })

    // PERSONAL COPY
    try {
        MCNode.bulkCreate(EXAMPLE_DATA.nodes);
    } catch(err) {
        console.log(err);
    }
}

/** Job to get node statistics every 30 minutes */
export const saveNodeDataJob = new CronJob({
    cronTime: '*/30 * * * *', // every 30 minutes
    runOnInit: true,
    onTick: () => saveNodeData()
})