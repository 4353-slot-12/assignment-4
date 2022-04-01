export default class SampleController {
    
    /* Echos request message back to client */
    static async echo(req, res) {
        res.status(200).send({ echo: req.body.message });
    }
}