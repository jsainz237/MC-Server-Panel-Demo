import { Router, Request, Response } from 'express';
// import axios, { AxiosResponse } from 'axios';
import MCNode, { MCNodeAttr } from '../models/mcnode';
import { EXAMPLE_DATA } from '../jobs/saveNodeData';

// initialize router
const router = Router();

/**
 * expected interface of body to recieve from /nodeslist demo endpoint
 * and to send back to original requester
 */
interface ResponseBody {
    nodes: MCNodeAttr[];
}

type Body = ResponseBody | { errors: string[] };

/**
 * FOR TECHNICAL INTERVIEW: on GET request to '/nodes/live', return all nodes recieved from demo endpoint
 * FOR PERSONAL COPY: return all node data from EXAMPLE_DATA
 */
router.get('/live', async ( _: Request, res: Response<Body> ) => {
    // TECHNICAL INTERVIEW
    // try {
    //     const response: AxiosResponse<ResponseBody> = await axios.get('COMPANY_MOCK_ENDPOINT')
    //     return res.status(200).send({ nodes: response.data.nodes });
    // } catch(err) {
    //     console.error(err.message);
    //     return res.status(500).send({ errors: [`internal error`]})
    // }

    // PERSONAL COPY
    return res.status(200).send({ nodes: EXAMPLE_DATA.nodes })
});

/** 
 * FOR TECHNICAL INTERVIEW: On GET to /nodes/live/:node_id, return single node returned from demo endpoint 
 * FOR PERSONAL COPY: return single node from example data
 */
router.get('/live/:node_id', async ( req: Request<{node_id: string}>, res: Response<MCNodeAttr | {errors: string[]}> ) => {
    const node_id = parseInt(req.params.node_id);

    // TECHNICAL INTERVIEW
    // try {
    //     const response: AxiosResponse<ResponseBody> = await axios.get('COMPANY_MOCK_ENDPOINT')
    //     return res.status(200).send(response.data.nodes.filter(node => node.node_id === node_id )[0]);
    // } catch(err) {
    //     console.error(err.message);
    //     return res.status(500).send({ errors: [`internal error`]})
    // }

    // PERSONAL COPY
    return res.status(200).send(EXAMPLE_DATA.nodes.filter(node => node.node_id === node_id)[0]);
});


/** 
 * FOR TECHNICAL INTERVIEW: On GET to /nodes/list, return list of node_ids from mock.io endpoint 
 * FOR PERSONAL COPY: return list of node_ids from example data
 */
router.get('/list', async ( _: Request, res: Response<{nodes: number[]} | {errors: string[]}> ) => {
    // TECHNICAL INTERVIEW
    // try {
    //     const response: AxiosResponse<ResponseBody> = await axios.get('COMPANY_MOCK_ENDPOINT')
    //     return res.status(200).send({ nodes: response.data.nodes.map(node => node.node_id) });
    // } catch(err) {
    //     console.error(err.message);
    //     return res.status(500).send({ errors: [`internal error`]})
    // }

    // PERSONAL COPY
    return res.status(200).send({ nodes: EXAMPLE_DATA.nodes.map(node => node.node_id) });
});

/** On GET request to /:node_id, return all records in database with matching node_id */
router.get('/:node_id', async ( req: Request<{ node_id: string }>, res: Response<Body> ) => {
    const node_id = parseInt(req.params.node_id);

    try {
        const records = await MCNode.findAll({ 
            where: { node_id: node_id },
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).send({ nodes: records })
    }
    catch(err) {
        console.error(err.message);
        return res.status(500).send({ errors: [`internal error`]})
    }
})

export default router;