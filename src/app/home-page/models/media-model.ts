export class MediaModel {
    public title: string;
    public type: eMediaType;
}

export enum eMediaType {
    image = 'image',
    document = 'document',
    video = 'video',
    audio = 'audio'
}
