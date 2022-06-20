export default class LoadPage{

    static async get(page){
        const response = await fetch(page);
        const resHtml = await response.text();
        return resHtml;
    };
}