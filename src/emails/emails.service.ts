import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(cuerpoCorreo: CreateEmailDto) {
    try {
      const email = await this.mailService.sendMail(cuerpoCorreo);

      return email;
    } catch (err) {
      console.log(err);
    }
  }
}
