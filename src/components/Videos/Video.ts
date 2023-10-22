// ESTA INTERFAZ DEBE TENER TODOS LOS ATRIBUTOS DEL ELEMENTO VIDEO, DEL BACKEND
// ? A CONTINUACION DEL ATRIBUTO, SEÑALA QUE ESE ATRIBUTO ES OPCIONAL
export interface Video {
// export type Video = {
    title: string;
    description: string;
    url: string;
    // OPCION PARA QUE ACEPTE VALORES Date
    updatedAt?: string | Date;
    createdAt?: string | Date;
    _id?: string;
}
