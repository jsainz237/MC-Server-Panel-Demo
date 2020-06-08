import { CronJob } from 'cron';
import { Op } from 'sequelize';
import MCNode from "../models/mcnode";

/** Delete rows in database that was created more than a year ago */
function cleanDB() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // if model is not initialized yet, return
    if(!MCNode.isInitialized) { return; }

    // delete rows where createdAt value is lt a year ago from now
    MCNode.destroy({
        where: {
            createdAt: {
                [Op.lt]: yesterday
            }
        }
    })
}

/** Job to clean database at 3:00AM everyday */
export const cleanDBJob = new CronJob({
    cronTime: '0 3 * * *', // at 3:00AM everyday
    onTick: () => cleanDB()
})