import {Router} from 'express';
import { Articulo } from '../entity/Articulo';
var multer  = require('multer')
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from 'class-validator';
import ArticuloController from '../controller/ArticuloController';

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
router.get('/',  ArticuloController.getAll);

// CREAR ARTICULO
router.post('/add-articulo', ArticuloController.insertArticulo);

//GET ARTICULOS POR CATEGORIA
router.get('/categoria',  ArticuloController.getArticulosCategoria);

 //UPDATE NOMBRE ARTICULO POR ID
router.patch('/:idArticulo', ArticuloController.editArticulo);



export default router;





