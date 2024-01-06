const customHeader = (req, res, next)=>{
    try {
        console.log(req.headers);
        const apiKey = req.headers.api_key;
        if(apiKey == 'api-publica-123'){
            next();
        } else{
            res.status(403);
            res.send({error: "API_KEY_NO_ES_VALIDA"})
        }
    } catch (error) {
        console.log(error);
        res.status(403);
        res.send({error: "Algo ocurrio en el custom header"});
    }
}

module.exports = customHeader;