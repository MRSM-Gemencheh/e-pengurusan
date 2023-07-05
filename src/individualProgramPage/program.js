


const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);


const docID = urlParams.get('docID')
console.log(docID);