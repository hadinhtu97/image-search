import fetch from 'node-fetch'

const key = 'AIzaSyBWtW-YDkoF8N-nGskYKwdSjvdE8yoB19M'
const cx = '436c9bbb96623be37'
const api = 'https://www.googleapis.com/customsearch/v1?searchType=image&key=' + key + '&cx=' + cx
const imgSize = ['huge', 'icon', 'large', 'medium', 'small', 'xlarge', 'xxlarge']
const imgColorType = ['color', 'gray', 'mono', 'trans']
const fileType = ['jpg', 'png']

const isNumValid = (num) => num >= 1 && num <= 10 ? true : false
const isPageValid = (page) => page >= 1 && page <= 9 ? true : false
const isSizeValid = (size) => imgSize.indexOf(size) != -1 ? true : false
const isColorValid = (color) => imgColorType.indexOf(color) != -1 ? true : false
const isTypeValid = (type) => fileType.indexOf(type) != -1 ? true : false

export default async ({ query, num, page, size, color, type }) => {
    if (!isNumValid(num)) return { error: 'number of image must from 1 to 10' }
    if (!isPageValid(page)) return { error: 'page to search must from 1 to 9' }
    if (!isSizeValid(size)) return { error: 'image size must be one of: huge, icon, large, medium, small, xlarge or xxlarge' }
    if (!isColorValid(color)) return { error: 'image color must be one of: color, gray, mono or trans' }
    if (!isTypeValid(type)) return { error: 'image type mus be one of: jpg or png' }
    let url = api + '&q=' + query + '&imgSize=' + size + '&imgColorType=' + color + '&fileType=' + type + '&start=' + page * 10 + '&num=' + num
    let res = await fetch(url)
    let data = await res.json()
    if (data.hasOwnProperty('error')) return { error: 'This API is limited to 100 requests per day. I will fix it soon. Come back tomorrow.' }
    if (data.items == null) return { error: 'Cannot find any image with query: ' + query }
    return data.items.map(item => {
        return {
            url: item.link,
            description: item.title,
            height: item.image.height,
            witdh: item.image.width,
            pageURL: item.image.contextLink,
        }
    })
}