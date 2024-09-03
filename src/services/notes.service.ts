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
    public getNote = async (id: number, createdBy: number) => {
        try {
            const data = await this.Note.findOne({
                where: {
                    id: id,
                    createdBy: createdBy
                }
            });
            return data;
        } catch (error) {
            console.error("Error fetching note:", error);
            throw error;
        }
    }

    //delete notes 
    public deleteNoteById = async (id: number, createdBy: number) => {
        try {
            const fetchNote = await this.Note.findOne({
                where: {
                    id: id,
                    createdBy: createdBy
                }
            });

            if (fetchNote) {
                await fetchNote.destroy();
                return fetchNote;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            throw error;
        }
    }

    //update Notes
    public updateNote = async (id: number, createdBy: number, updateBody: Partial<INote>) => {
        try {
            const fetchNote = await this.Note.findOne({
                where: {
                    id: id,
                    createdBy: createdBy
                }
            });

            if (fetchNote) {
                await fetchNote.update(updateBody);
                return fetchNote;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error updating note:", error);
            throw error;
        }
    }

    //archive Note
    public isArchive = async (id, createdBy) => {
        try {
            const data = await this.Note.findOne({
                where: {
                    id: id,
                    createdBy: createdBy
                }
            });
            data.isArchive = !data.isArchive;
            await data.save();
            return data;
        } catch (error) {
            console.error("Error archiving note:", error);
            throw error;
        }
    }

    //trash Note
    public isTrash = async (id, createdBy) => {
        try {
            const data = await this.Note.findOne({
                where: {
                    id: id,
                    createdBy: createdBy
                }
            });
            data.isTrash = !data.isTrash;
            await data.save();
            return data;
        } catch (error) {
            console.error("Error trashing note:", error);
            throw error;
        }
    }

}

export default NoteService;
