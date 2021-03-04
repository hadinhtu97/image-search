import search from '../../lib/search'
import dbConnect from '../../utils/dbConnect'
import Recent from '../../models/Recent'

export default async (req, res) => {

    await dbConnect()

    if (req.method == 'GET') {
        if (req.query.query == undefined || req.query.query == '') {
            res.json({ error: 'Required query parameter!' })
        } else {
            let arg = {
                query: req.query.query,
                num: req.query.num || 10,
                page: req.query.page || 1,
                size: req.query.size || 'medium',
                color: req.query.color || 'color',
                type: req.query.type || 'jpg'
            }
            let data = await search(arg)
            let recent = new Recent({
                query: arg,
                created_at: new Date(),
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                success: true
            })
            if (data.hasOwnProperty('error') == true) {
                recent.success = false
            }
            await recent.save()
            res.json(data)
        }
    } else {
        res.status(404).end()
    }
}