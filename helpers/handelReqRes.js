//dependency
const url = require('url')
const { StringDecoder } = require('string_decoder') ;
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler')
//handel object - module scaffolding
const handler = {}

handler.handleReqRes = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };
    // console.log('Route ',routes);

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) =>{

        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        const payloadString = typeof(payload) === 'object' ?  JSON.stringify(payload) : {};
        
        res.writeHead(statusCode);
        res.end(payloadString)
    })


    //console.log(requestProperties);
    // const decoder = new StringDecoder('utf-8')

    // let realData = ''

    // req.on('data', (buffer)=>{
    //     realData += decoder.write(buffer)
    // })

    // req.on('end', () =>{
    //     realData += decoder.end()
    //     console.log(realData);
    // })

    res.end('Hello world, Hello Zaman')
}

module.exports = handler