'use strict';
import { Model } from 'sequelize';
import { INote } from '../interfaces/notes.interface';

export default (sequelize, DataTypes) => {
    class Note extends Model<INote> implements INote {
        public title;
        public description;
        public colour;
        public isArchive;
        public isTrash;
        public createdBy;

    }
    Note.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            colour: DataTypes.STRING,
            isArchive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isTrash: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            createdBy: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'note'
        }
    );
    return Note;
};
