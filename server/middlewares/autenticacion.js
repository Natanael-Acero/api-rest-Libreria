let verificaToken = (req, res, next) => {
    let token = req.get('token');
    console.log('hola querido padre, he entrado al middleware pero no te diste cuenta');
    next();
    //return res.status(200).json({
    //  token
    // });
}
module.exports = {
    verificaToken
}