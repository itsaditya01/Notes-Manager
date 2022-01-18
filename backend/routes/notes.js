const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Router 1 : Fetching all notes of loggedIn user: using GET "api/notes/fetchallnotes" :: login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const Notes = await Note.find({user : req.user.id});
        res.json(Notes);
    } catch (error) {
        res.status(500).send("Internal Server Error")
        
    }
});
 
//Router 2 : adding note of loggedIn user: using GET "api/notes/addnote" :: login required
router.post(
    '/addnote', fetchuser, [
    body('title','Title cannot be blank').exists(),
    body('description','Description should be atleast 3 characters long').isLength({min:3})],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            const {title, description, tag} = req.body;
            const note = new Note({title, description, tag, user: req.user.id});
            const savedNote = await note.save();
            res.json(savedNote);
            
        } catch (error) {
            res.status(500).send("Internal Error")
        }

    })

//Router 3 : Updating note of loggedIn user: using PUT "api/notes/updatenote" :: login required
router.put(
    '/updatenote/:id', fetchuser, [
    body('title','Title cannot be blank').exists(),
    body('description','Description should be atleast 3 characters long').isLength({min:3})],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const {title, description, tag} = req.body;
            const newNode = {};
            if(title){
                newNode.title = title;
            }
            if(description){
                newNode.description = description;
            }
            if(tag){
                newNode.tag = tag;
            }
            let note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not found");
            }

            if(note.user.toString() !== req.user.id){
                return res.status(400).send("Not allowed");
            }

            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNode}, {new: true});
            res.json({note});

        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Error");
        }

    })

//Router 3 : Updating note of loggedIn user: using PUT "api/notes/updatenote" :: login required
router.delete(
    '/deletenote/:id', fetchuser, 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not found");
            }

            if(note.user.toString() !== req.user.id){
                return res.status(400).send("Not allowed");
            }
            note = await Note.findByIdAndDelete(req.params.id);
            res.send("Deleted Successfully");

        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Error");
        }
    })
module.exports = router;