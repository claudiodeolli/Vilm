export default class MediaList{

    #list;

    constructor(list){

        this.#list = [...list];
        Object.freeze(this);
    };

    get list(){

        return [].concat(this.#list);
    }
}