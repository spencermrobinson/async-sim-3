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
        const db = req.app.get('db');
        console.log(req.params,'params')
        console.log(typeof req.user)
        db.getfilter([ req.user.id , req.params.filter ]).then(response => {
            console.log(response,"response")
            res.status(200).send(response)
            
        }).catch ( (err)=> res.status(500).send(console.log(err)))
    },
}