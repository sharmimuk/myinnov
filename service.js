const axios = require('axios');
require('dotenv').config();

const writeNewFile = (body) => {
    const filecontent = Buffer.from(JSON.stringify(body.content)).toString('base64');

    const responseObject = axios.put(process.env.githubContentsURL + '/' + JSON.stringify(body.repository) + '/contents/quality.conf.json', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.token
        },
        data: {
            "message": "Created quality.conf.json",
            "committer": {
                "name": body.author,
                "email": body.authorEmail
            },
            "content": filecontent
        }
    });

    return responseObject;
}

const getFileDetails = async (body) => {
    const responseObject = await axios.get(process.env.githubContentsURL + '/' + JSON.stringify(body.repository) + '/contents/quality.conf.json', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.token
        }
    });

    return responseObject;
}

module.exports = {
    writeNewFile,
    getFileDetails
}