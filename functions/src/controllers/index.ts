import { blogController } from './blogController';
import {indexRouteController} from './indexController';

const postController  = new blogController(),
      indexController = new indexRouteController();

export {
    postController,
    indexController
};