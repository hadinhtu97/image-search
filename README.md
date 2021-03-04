# Image Search

## Description
Using Google API to search image.

## User stories
* You can get the image URLs, description and page URLs for a set of images relating to a given search string.
* You can paginate through the responses by adding a ?page=2 parameter to the URL.
* You can get a list of the most recently submitted search strings.

## Use
```
git clone https://github.com/hadinhtu97/image-search
cd image-search
npm install
npm run build
npm run start
```

## APIs 
* GET : `[]/api/image?query={query}` receive array contain url, description, height, width and pageURL of images. List parameters:
  * `query` (required) : query to search images
  * `num` (optional) : length or array will received, must from 1 to 10. Default is `10`.
  * `page` (optional) : searching images on this page, must from 1 to 9. Default is `1`.
  * `size` (optional) : size of images received. Valid values are:
    * `icon`
    * `small`
    * `medium` : default
    * `large`
    * `xlarge`
    * `xxlarge`
    * `huge`
  * `color` (optional) : color type of images received. Valid values are:
    * `color` : default
    * `gray`
    * `mono` : black and white
    * `trans` : transparent background
  * `type` (optional) : type of images received. Valid values are:
    * `jpg` : default
    * `png`

## Demo 
[Link demo](https://image-search.hadinhtu97.repl.co/)