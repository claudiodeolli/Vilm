export default class ConvertDate{

    static fullDateForYearOnly(fullDate){

        if(!fullDate) return '';

        return fullDate.split('-')[0];
    };
}