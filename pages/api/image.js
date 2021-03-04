import search from '../../lib/search'

export default async (req, res) => {
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
            res.json(data)
        }
    } else {
        res.status(404).end()
    }
}