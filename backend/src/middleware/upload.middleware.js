import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createCloudinaryStorage } from '../config/cloudinary.js';

// Helper for storage creation
const getStorage = (folder) => {
  // Use Cloudinary if credentials are set
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
    return createCloudinaryStorage(folder);
  }

  // Fallback to local storage
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `uploads/${folder}/`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
  });
};

// File validation
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG and WEBP are allowed.'));
  }
};

// Single image for property main thumbnail
export const uploadPropertyImage = multer({
  storage: getStorage('properties'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
}).single('property_image');

// Multiple images for property gallery
export const uploadPropertyGallery = multer({
  storage: getStorage('properties/gallery'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
}).array('gallery_images', 10);

export const uploadAgentImage = multer({
  storage: getStorage('agents'),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
}).single('agent_image');

export const uploadTenantImage = multer({
  storage: getStorage('tenants'),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
}).single('tenant_image');
