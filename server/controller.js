module.exports = {
    updateUser: (req, res) => {
        let db = req.app.get('db');
        let { id, firstname, lastname, eye, hair, gender, hobby, birthday} = req.body;
        db.update_profile([ firstname, lastname, gender, hair, eye, hobby, birthday, id])
        .then( response => {
            res.status(200).send(response.data)
            console.log(response.data)
        }).catch( ()=> res.status(500).send())
    },

    recommended: (req, res) => {
        let db = req.app.get('db');
        db.find_recommended().then(response => {
            res.status(200).send(response)
            console.log(response, 'recommended')
        }).catch ( ()=> res.status(500).send())
    },
}