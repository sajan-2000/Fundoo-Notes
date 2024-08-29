import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
const jwt = require('jsonwebtoken');
import { INote } from '../interfaces/notes.interface';
import noteutil from '../utils/notes.util';

import note from '../models/notes';

let redisData;
class NoteService {
    private Note = note(sequelize, DataTypes);
    public noteUtil = new noteutil();
    //create Note
    public addNote = async (noteData) => {
        try {
            const data = await this.Note.create(noteData);
            if (data) {
                redisData = await this.noteUtil.update(noteData.createdBy, data);
                return data;
            } else {
                return data;
            }
        } catch (error) {
            console.error("Error creating note:", error);
            throw error;
        }

    }

    //read All the notes
    public getAllNotes = async (createdBy) => {
        try {
            const data = await this.Note.findAll({
                where: {
                    createdBy: createdBy
                }
            });

            if (data) {
                redisData = await this.noteUtil.set(createdBy, data);
                return data;
            } else {
                return data;
            }
        } catch (error) {
            return error;
        }

    }

    //read by id
    public getNote = async (id) => {

        const data = await this.Note.findByPk(id)
        return data;
    }

    //delete notes 
    public deleteNoteById = async (id) => {
        const fetchNote = await this.Note.findByPk(id);
        await fetchNote.destroy();

        return fetchNote;
    }

    //update Notes
    public updatNote = async (id, updateBody) => {
        const fetchNote = await this.Note.findByPk(id);
        await fetchNote.update(updateBody);
    }

    //archive Note
    public isArchive = async (id) => {
        const data = await this.Note.findByPk(id);
        data.isArchive = !data.isArchive;
        await data.save();
        return data;
    }

    //trash Note
    public isTrash = async (id) => {
        const data = await this.Note.findByPk(id);
        data.isTrash = !data.isTrash;
        await data.save();
        return data;
    }

}

export default NoteService;
