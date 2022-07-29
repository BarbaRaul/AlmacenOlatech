import {Router} from 'express';
import { Categoria } from '../entity/Categoria';
var multer  = require('multer')
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from 'class-validator';
import CategoriaController from '../controller/CategoriaController';

var storage = multer.diskStorage({
    destination:`src/uploads`,
    filename: function(req, file, callback){
        const filedoc = file.originalname.replace(/\s/g, "-");
        callback(null, filedoc)
    }
});
var upload = multer({storage:storage})

const router = Router();

//GET
router.get('/',  CategoriaController.getAll);


// CREAR CATEGORIA
router.post('/add-categoria', CategoriaController.insertCategoria);

export default router;





