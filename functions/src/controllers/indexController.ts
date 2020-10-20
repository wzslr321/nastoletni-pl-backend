// @ts-ignore
import {Request, Response} from 'express';
import {CrudController}   from "./crudController";

export class indexRouteController extends CrudController {
    public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>): void {
        throw new Error("Method not implemented.");
    }
    public read(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>): void {
        res.status(201).json({message: 'Pozdrawiam z indexu Nastoletnich :D '})
    }
    public update(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>): void {
        throw new Error("Method not implemented.");
    }
    public delete(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>): void {
        throw new Error("Method not implemented.");
    }

}

