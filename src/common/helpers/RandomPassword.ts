import { Injectable } from '@nestjs/common';

import * as generatePassword from 'generate-password';

import * as bcrypt from 'bcrypt';

@Injectable()
export class RandomPassword {
  // Usando bcrypt (dependencia) generamos un hash unidireccional
  public static Encriptar(texto: string): string {
    const encript: string = bcrypt.hashSync(texto, 10);
    return encript;
  }

  public static generarContrasenaAleatoria(longitud: number): string {
    let contrasena = '';

    do {
      contrasena = generatePassword.generate({
       length: longitud,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true,
      });
    } while (!this.cumpleReglas(contrasena));

    return contrasena;
  }

  public static cumpleReglas(password: string): boolean {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneSimbolo = /[!@#$%^&*()\-_=\+[\]{}<>?/|]/.test(password);
    const longitudMinima = password.length >= 8;

    return (
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneSimbolo &&
      longitudMinima
    );
  }

  public static encriptarContrasena(contrasena: string): string {
    //? El numero que se pasa como segundo argumento es la complejidad de la contraseña, mientras mas alto
    //? mas compleja pero igual tardara mas en generarla
    return bcrypt.hashSync(contrasena, 10);
  }
}
