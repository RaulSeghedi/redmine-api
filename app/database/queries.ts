import {sqlRequest} from "./mssql-connect";
import {databaseOptions} from "../util/constants";
export function insertData(issues: any[]) {
    for (let i = 0; i < issues.length; i++) {
        let issue = issues[i].issue;
        let query = `INSERT INTO Issue(id, projectId,..) VALUES (${issue.id},${issue.projectId},.....)`
        sqlRequest(databaseOptions.name).query(query, (err: any, result: any)=> {
            if (err) throw err;
            console.log("One ISSUE inserted")
        })
    }
}