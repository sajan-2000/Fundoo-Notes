export interface INote {
    id?: number;
    title: string;
    description: string;
    colour: string;
    isArchive: boolean;
    isTrash: boolean;
    createdBy: number;
}