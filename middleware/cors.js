const cors = (req, res, next) => {
    // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    next();
}

module.exports = cors;