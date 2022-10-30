async function mwCheckIdParam(req, res, next){

    let msgError = null;

    if(req.params.id == null){
        msgError = 'El parametro "id" es requerido';
    }

    if(!Number(req.params.id) || req.params.id < 0){
        msgError = 'El id no es valido';
    }

    if(msgError){
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({msgError}));
    }
    
    next()
}

async function mwCheckCreateTopic(req, res, next){

    let msgError = null;

    if(req.body.topicName == null){
        msgError = 'El parametro "topicName" es requerido';
    }

    if(req.body.topicValue == null){
        msgError = 'El parametro "topicValue" es requerido';
    }
/*
    if(req.body.topicName.length > 5){
        msgError = 'El parametro "topicName" no debe superar los 240 caracteres';
    }
*/
    if(msgError){
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({msgError}));
    }

    next()
}

module.exports = {
    mwCheckIdParam,
    mwCheckCreateTopic
}