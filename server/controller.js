module.exports = {
    updateUser: (req, res) => {
        let db = req.app.get('db');
        let { id, firstname, lastname, eye, hair, gender, hobby, birthday} = req.body;
        db.update_profile([ firstname, lastname, gender, hair, eye, hobby, birthday, id])
        .then( response => {
            res.status(200).send(response[0])
        }).catch( ()=> res.status(500).send())
    },

    recommended: (req, res) => {
        const db = req.app.get('db');
        db.getfilter([ req.user.id , req.params.filter ]).then(response => {
            res.status(200).send(response)
        }).catch ( (err)=> res.status(500).send(console.log(err)))
    },

    addRecommended: (req, res) => {
        const db = req.app.get('db');
        db.add_recommended([req.user.id, req.params.id]).then( ()=> db.getfilter([req.user.id, req.params.filter ])).then( response =>{
            res.status(200).send(response)
        }).catch( (err) => res.status(500).send(console.log(err)))
    },

    searchAll: (req, res) => {
        const db= req.app.get('db');
        console.log(req.user)
        db.searchAll([req.user.id]).then(response => {
            console.log('searchAll:', response)
            res.status(200).send(response)
        }).catch( (err) => res.status(500).send(console.log(err)));

    },
    searchFriends: (req, res) => {
        const db = req.app.get('db');
        console.log('req.params:', req.params)
        const input = req.params.input == 'null' ? '' : req.params.input;
        console.log('input:',input)
        db.searchfriends([req.user.id, req.params.col, `${input}`, req.params.page]).then( response => {
            console.log('searchFriends:', response)
            res.status(200).send(response)
        }).catch( (err) => res.status(500).send(console.log(err)));
    }
}