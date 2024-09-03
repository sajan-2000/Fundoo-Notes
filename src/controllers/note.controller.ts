
import HttpStatus from 'http-status-codes';
import noteService from '../services/notes.service';

import { Request, Response, NextFunction } from 'express';

class NoteController {
    public NoteService = new noteService();

    public createNote = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const data = await this.NoteService.addNote(req.body);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note created successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    public getNote = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const data = await this.NoteService.getNote(Number(req.params.id), req.body.createdBy);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note fetched successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    public getAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const data = await this.NoteService.getAllNotes(req.body.createdBy);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note fetched successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    public deleteNoteById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const data = await this.NoteService.deleteNoteById(Number(req.params.id), req.body.createdBy);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    public updateNote = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const data = await this.NoteService.updateNote(Number(req.params.id), req.body.createdBy, req.body);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    public toggleArchive = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const data = await this.NoteService.isArchive(Number(req.params.id), req.body.createdBy);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note archive status toggled successfully'
            });
        } catch (error) {
            return {
                code: HttpStatus.BAD_GATEWAY,
                data: [],
                message: 'Something went wrong..😵'
            };
        }
    }

    public toggleTrash = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const data = await this.NoteService.isTrash(Number(req.params.id), req.body.createdBy);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note trash status toggled successfully'
            });
        } catch (error) {
            return {
                code: HttpStatus.BAD_GATEWAY,
                data: [],
                message: 'Something went wrong..😵'
            };
        }
    }
}

export default NoteController;
