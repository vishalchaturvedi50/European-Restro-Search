onmessage = function (ev) {
    let resp = ev.data;
    let tempResturantArr = [];
    /* SPLIT CSV STRING with new line */
    let str = resp.toString();
    let strSplit = str.split("\n");
    /* ITERATE OVER EACH LINE */
    strSplit.forEach((eachRow, i) => {
        /* JUST NOT THE FIRST LINE AS IT WILL CONTAIN HEADER */
        if (i != 0) {
            /* SPLIT WITH COMMA EXCEPT ONE INSIDE [] */
            let rowSplit = eachRow.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            if (rowSplit != null && rowSplit.length > 0) {
                /* CREATE TEMP RESTURANT OBJECT */
                let tempRest = {};
                tempRest.name = rowSplit[0];
                tempRest.city = rowSplit[1];
                tempRest.cuisineStyle = rowSplit[2] ? rowSplit[2].replace('"[', "").replace(']"', "").
                    replace(new RegExp("'", "g"), "").split(",").map(r => { return r.trim() }) : [];
                tempRest.ranking = parseInt(rowSplit[3]);
                tempRest.rating = parseFloat(rowSplit[4]);
                tempRest.noOfReviews = parseInt(rowSplit[5]);
                /* PUSH IT TO TEMP GLOBAL  */
                tempResturantArr.push(tempRest);
            }
        }
    })

    postMessage(tempResturantArr);

}