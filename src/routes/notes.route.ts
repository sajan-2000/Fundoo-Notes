import express, { IRouter } from 'express';
import noteController from '../controllers/note.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import user from '../models/user';

class NoteRoutes {
    private NoteController = new noteController();
    private router = express.Router();

    constructor() {
        this.routes();
    }

    private routes = () => {
        //create notes
        this.router.post('', userAuth, this.NoteController.createNote);

        //read all notes
        this.router.get('', userAuth, this.NoteController.getAllNotes);

        //read notes by id
        this.router.get('/:id', userAuth, this.NoteController.getNote);

        //delete notes
        this.router.delete('/delete/:id', userAuth, this.NoteController.deleteNoteById);

        //update notes
        this.router.put('/update/:id', userAuth, this.NoteController.updateNote);

        //archive Notes
        this.router.put('/archive/:id', userAuth, this.NoteController.toggleArchive);

        //trash Notes
        this.router.put('/trash/:id', userAuth, this.NoteController.toggleTrash);

    };

    public notesRoutes = (): IRouter => {
        return this.router;
    };
}

export default NoteRoutes;
