export class UsuarioModel {
    email: string;
    password: string;
    nombre: string;
    idUsuario?: string;
}

export class MensajeModel {
    emisor: string;
    receptor: string;
    mensaje: string;
    fecha: number;
}
