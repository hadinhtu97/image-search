import dbConnect from '../../utils/dbConnect'
import Recent from '../../models/Recent'

export default async (req, res) => {

    await dbConnect()

    if (req.method == 'GET') {
        let data = await Recent.find({})
            .sort({ created_at: -1 })
            .select({
                _id: 0,
                __v: 0
            })
            .limit(10).exec()
        res.json(data)
    } else {
        res.status(404).end()
    }
}