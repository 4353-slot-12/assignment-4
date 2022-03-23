export default class SampleController {
    
    /* Echos request message back to client */
    static echo(req, res) {
        res.status(200).send({ echo: req.body.message });
    }
}