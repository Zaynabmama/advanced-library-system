import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessages } from '../errors/errors';

@Injectable()
export class UploadService {
  private readonly baseUploadPath = path.resolve('./uploads'); 

  uploadFile(file: Express.Multer.File, uploadPath: string): string {
    if (!file) {
      throw new BadRequestException(ErrorMessages.FILE_NOT_PROVIDED);
    }

    const fullUploadPath = path.join(this.baseUploadPath, uploadPath);
    if (!fs.existsSync(fullUploadPath)) {
      fs.mkdirSync(fullUploadPath, { recursive: true });
    }


    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    const fullFilePath = path.join(fullUploadPath, uniqueFileName);


    fs.writeFileSync(fullFilePath, file.buffer);

    return path.relative(this.baseUploadPath, fullFilePath).replace(/\\/g, '/');
  }

 
  validateFile(file: Express.Multer.File, allowedTypes: string[]) {
    if (!file) {
      throw new BadRequestException(ErrorMessages.FILE_NOT_UPLOADED);
    }

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.mimetype}. Allowed types are: ${allowedTypes.join(', ')}.`,
      );
    }
  }

  
  uploadImage(file: Express.Multer.File, folder: string = 'images'): string {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    this.validateFile(file, allowedImageTypes);

    return this.uploadFile(file, folder);
  }

  
  uploadPdf(file: Express.Multer.File, folder: string = 'pdfs'): string {
    const allowedPdfTypes = ['application/pdf'];
    this.validateFile(file, allowedPdfTypes);

    return this.uploadFile(file, folder);
  }
}
