const express = require('express');
const router = express.Router();

const models = require('../../models');


//@route    GET api/notes
//@desc     Get all comments from database
router.get('/', (req,res)=> {
    res.json({'test':'This a UPDATE request'});
});

//@route    POST api/comments
//@desc     Post a comment
router.post('/new',(req,res)=> {
    
    const body = req.body.body;
    const id =req.body.id;
    console.log(body);
    // console.log(req.user);
    // console.log(req.user.id);
   
    models.Comment.findOne({ where: {id},
    })
    .then(commentid => {
        if(!commentid){
            //create a new note
            models.Comment.create({
                 noteId: req.body.noteId,
                 userId: req.body.userId,
                body: body
            })
            .then(Comment => {
                console.log("saved");
                console.log(Comment);
                res.json(Comment);
            }).catch(error => {
                res.status(400).send(error)
            });
           
        } else {
            res.json({error: 'Error'})
        }
    });   

});
   
      
//@route    GET api/comments
//@desc     GET a comment
router.get('/noteComments/:noteId',(req,res)=> {
    const noteId = req.params.noteId;
  
    // console.log(req.user);
    // console.log(req.user.id);
   
    models.Comment.findAll({ where: {noteId},
    })
    .then ( responce => {
        console.log(responce)
        res.json(responce)
    })
    .catch(err => {
        console.log('---error----')
        console.log(err)
    })
});
   

//@route    Update api/notes/:id
//@desc     Update a note to database
router.post('/edit/:id', (req,res)=> {
    res.json({'test':'This a UPDATE request'});
});

//@route    Delete api/notes/:id
//@desc     Post a note to database
router.delete('/:id', (req,res)=> {
    res.json({'test':'This a DELETE request'});
});


module.exports = router;