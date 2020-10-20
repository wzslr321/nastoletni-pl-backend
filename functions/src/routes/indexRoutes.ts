import express, { Request, Response } from 'express';
import {indexController} from '../controllers';

export const router = express.Router({
    strict: true
});


router.get('/', (req: Request, res: Response) => {
    indexController.read(req, res);
});

