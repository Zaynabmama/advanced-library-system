import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ErrorMessages } from '../errors/errors';

@Injectable()
export class UploadService {
  uploadFile(file: Express.Multer.File, uploadPath: string): string {
    const destination = path.resolve(uploadPath);
    
    
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    
    const fileName = file.originalname;

   
    const fullPath = path.join(destination, fileName);

   
    fs.writeFileSync(fullPath, file.buffer);

    return `/${uploadPath}/${fileName}`;
  }

  validateFile(file: Express.Multer.File, allowedTypes: string[]): boolean {
    const fileType = file.mimetype.split('/')[1]; 
    return allowedTypes.includes(fileType);
  }

  uploadImage(file: Express.Multer.File): string {
    const allowedTypes = ['jpeg', 'png', 'jpg'];
    if (!this.validateFile(file, allowedTypes)) {
      throw new Error(ErrorMessages.INVALID_FILE_TYPE);
    }

    const uploadPath = 'uploads/images'; 
    return this.uploadFile(file, uploadPath);
  }

  uploadPdf(file: Express.Multer.File): string {
    const allowedTypes = ['pdf'];
    if (!this.validateFile(file, allowedTypes)) {
      throw new Error(ErrorMessages.INVALID_FILE_TYPE_PDF);
    }

    const uploadPath = 'uploads/pdfs';
    return this.uploadFile(file, uploadPath);
  }
}
