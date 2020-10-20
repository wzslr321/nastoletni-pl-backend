
import express, { Request, Response } from 'express';
import {postController} from '../controllers';

export const router = express.Router({
    strict: true
});

router.post('/', (req: Request, res: Response) => {
    postController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
    postController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
    postController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
    postController.delete(req, res);
});
