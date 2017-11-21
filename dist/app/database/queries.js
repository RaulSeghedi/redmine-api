"use strict";
const mssql_connect_1 = require("./mssql-connect");
const constants_1 = require("../util/constants");
function insertData(issues) {
    for (let i = 0; i < issues.length; i++) {
        let issue = issues[i].issue;
        let query = `INSERT INTO Issue(id, projectId,..) VALUES (${issue.id},${issue.projectId},.....)`;
        mssql_connect_1.sqlRequest(constants_1.databaseOptions.name).query(query, (err, result) => {
            if (err)
                throw err;
            console.log("One ISSUE inserted");
        });
    }
}
exports.insertData = insertData;
//# sourceMappingURL=queries.js.map