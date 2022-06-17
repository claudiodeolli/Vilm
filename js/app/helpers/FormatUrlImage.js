export default class FormatUrlImage{

    static get(size, imgUrl){

        if(size != 200 && size != 300 && size != 400 && size != 500)
            throw new TypeError("It is not possible to adjust the image to this size, the available sizes are 200, 300, 400 or 500");

        return `https://image.tmdb.org/t/p/w${size}${imgUrl}`;
    }
}