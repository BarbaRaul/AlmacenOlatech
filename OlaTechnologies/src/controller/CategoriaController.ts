import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {Categoria} from "../entity/Categoria";
import * as fileUpload from "express-fileupload";
import {validate} from 'class-validator';


export class CategoriaController {


    // Servicio para obtener todos las categorias

    static getAll = async (req:Request, res:Response)=>{
    
        const categoriaRepository = getRepository(Categoria);
        
        try {
            
            const categoria = await categoriaRepository.find({"status": 1});
            if (categoria.length != 0 ){
            console.log(categoria);
            res.send(categoria);        
            }
            else{
                res.json({message:'No se han agregado articulos'});
            }
        } catch (e) {
            console.log(e.message);
            res.status(404).json({message:'No encontrado'});            
        }
    };

    static insertCategoria = async(req:Request, res:Response)=>{   
    const {idCategoria, nombreCategoria, status} = req.body;
    const categoria = new Categoria();

        categoria.idCategoria = idCategoria ;
        categoria.nombreCategoria = nombreCategoria;
        categoria.status = status;
       
        const categoriaRepository = getRepository(Categoria);
        try {
            const categoriaController = await categoriaRepository.find({"nombreCategoria": nombreCategoria});
            if (categoriaController.length == 0 ){
            await categoriaRepository.save(categoria);
            return res.status(409).json('Categoria creada '+nombreCategoria);

        }
        else{
            return res.status(409).json('Ya existe categoria '+ nombreCategoria);

        }
        } catch (e) {
            return res.status(409).json({'Error ': e.message});
        }

};


    

    
}
   



export default CategoriaController;