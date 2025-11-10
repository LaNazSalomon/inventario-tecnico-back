import { Injectable } from '@nestjs/common';

@Injectable()
export class MensajePassword {
  static CorreoDatosHTML(nombre: string, numeroEmpleado: number, contrasena: string): string {
    const message: string = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        text-align: center;
        border-left: 10px solid #275124;
      }
      h1 {
        font-size: 24px;
        color: #275124;
        margin-bottom: 20px;
      }
      .label {
        font-size: 16px;
        color: #691b32;
        margin: 10px 0;
      }
      .value {
        font-size: 18px;
        color: #275124;
        font-weight: bold;
      }
      .password {
        font-size: 28px;
        font-weight: bold;
        color: #7abd5f;
        margin: 30px 0;
      }
      .note {
        font-size: 14px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Credenciales de acceso</h1>
      <p class="label">Nombre:</p>
      <p class="value">${nombre}</p>
      <p class="label">Número de empleado:</p>
      <p class="value">${numeroEmpleado}</p>
      <p class="label">Contraseña:</p>
      <div class="password">${contrasena}</div>
      <p class="note">Si no solicitaste este acceso, ignora este mensaje.</p>
    </div>
  </body>
</html>`;
    return message;
  }
}