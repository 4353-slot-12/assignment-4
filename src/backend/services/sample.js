class SampleService {
    
    /* Echos request message back to client */
    static echoMessage(req, res) {
        res.status(200).send({ echo: req.body.message });
    }
}

export default SampleService;