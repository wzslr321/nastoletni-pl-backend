// @ts-ignore
import {Request, Response} from 'express';
import {CrudController}   from "./crudController";

import {db,postCollection} from "../index";

interface Post {
    title: String,
    shortDescription: String,
    longDescription: String,
    id: String
}

export class blogController extends CrudController {
    // CREATE ODPOWIADA .POST
    public async create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>): Promise<void> {
        const {title,shortDescription,longDescription,id} = req.body

        try {
            const post:Post = {
                title,
                shortDescription,
                longDescription,
                id
            }

            const newDoc = await db.collection(postCollection).add(post);
            res.status(201).send(`Stworzono nowy post: ${newDoc.id}`);
        } catch (error) {
            res.status(400).send(`post musi zawierać tytuł oraz opis`)
        }
    }

    // READ ODPOWIADA .GET
    public async read(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>): Promise<void> {
        try {
            const userQuerySnapshot = await db.collection(postCollection).get();
            const users: any[] = [];
            userQuerySnapshot.forEach(
                (doc)=>{
                    users.push({
                        id: doc.id,
                        data:doc.data()
                    });
                }
            );
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    public async update(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>):Promise<void> {

        await db.collection(postCollection).doc(req.params.postId).delete()
            .then( () => res.status(204).send('Pomyślnie usunięto post'))
            .catch( error => res.status(500).send(error));
    }
    public async delete(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>): Promise<void> {
        await db.collection(postCollection).doc(req.params.postId).set(req.body,{merge:true})
            .then( () => res.json({id:req.params.postId}))
            .catch( error => res.status(500).send(error));
    }

}

