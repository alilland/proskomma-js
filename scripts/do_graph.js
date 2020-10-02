const fse = require('fs-extra');

const { ProsKomma } = require('..');

if (process.argv.length !== 4) {
    console.log("USAGE: node do_graph.js <USFM/USX Path> <Query Path>");
    process.exit(1);
}
const contentPath = process.argv[2];
let content;
try {
    content = fse.readFileSync(contentPath);
} catch (err) {
    console.log(`ERROR: Could not read from USFM/USX file '${contentPath}'`);
    process.exit(1);
}
const contentType = contentPath.split('.').pop();
const queryPath = process.argv[3];
let query;
try {
    query = fse.readFileSync(queryPath).toString();
} catch (err) {
    console.log(`ERROR: Could not read query from file '${contentPath}'`);
    process.exit(1);
}
const pk = new ProsKomma();
try {
    pk.importDocument(
        "eng",
        "ust",
        contentType,
        content,
        {}
    );
} catch (err) {
    console.log(`ERROR: Could not import document: '${err}'`);
    process.exit(1);
}
pk.gqlQuery(query)
    .then(output => console.log(JSON.stringify(output, null, 2)))
    .catch(err => console.log(`ERROR: Could not run query: '${err}'`));
