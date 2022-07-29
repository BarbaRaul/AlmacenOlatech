import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {Articulo} from "../entity/Articulo";
import * as fileUpload from "express-fileupload";
import {isEmpty, validate} from 'class-validator';


export class ArticuloController {


    // Servicio para obtener todos los articulos

    static getAll = async (req:Request, res:Response)=>{
    
        const articuloRepository = getRepository(Articulo);
        
        try {
            const articulo = await articuloRepository.find({"status": 1});
            if (articulo.length != 0 ){

            console.log(articulo);
            res.send(articulo);        
            }
            else{
                res.json({message:'No se han agregado articulos'});
            }
        } catch (e) {
            console.log(e.message);
            res.status(404).json({message:'Error '+ e.message});            
        }
    };

    // Servicio para obtener articulos por categoria

    static getArticulosCategoria = async (req:Request, res:Response)=>{
        const {categoria} = req.body;

        const articuloRepository = getRepository(Articulo);
        
        try {
            const articulo = await articuloRepository.find({"categoria":categoria, "status": 1});
           if (articulo.length != 0 ){
            console.log(articulo);
            res.send(articulo);}
        else{
            res.json({message:'No se han agregado articulos de la categoria '+ categoria});
        }        
        } catch (e) {
            console.log(e.message);
            res.status(404).json({message:'Error'+ e.message});            
        }
    };

   

static editArticulo = async (req:Request, res:Response)=>{
    let articulo;
    const {id} = req.params;
    const {nombreArticulo, unidadesDisponibles, categoria, precio, status} = req.body;
    const articuloRepository = getRepository(Articulo);
    try {
        articulo = await articuloRepository.findOneOrFail(id); 
        articulo.nombreArticulo = nombreArticulo;
        articulo.unidadesDisponibles = unidadesDisponibles;
        articulo.categoria = categoria;
        articulo.precio = precio;
        articulo.status = status;

        await articuloRepository.save(articulo);

    } catch (e) {
        res.status(404).json({message:' no encontrado'});            
    }

};
//ELIMINAR
static deleteArticulo = async (req:Request, res:Response)=>{
    const {id} = req.params;
    const articuloRepository = getRepository(Articulo);
    let articulo;
     articulo = await articuloRepository.find({"idArticulo": 1});
        articulo.status = 0;
            
            await articulo.save(articulo);
            res.status(404).json({message:' Eliminado'});  

};

    static insertArticulo = async(req:Request, res:Response)=>{
        const {idArticulo, nombreArticulo, categoria, unidadesDisponibles, precio, status} = req.body;
        console.log("la data es:",req.body);
        const articulo = new Articulo();
    
           articulo.idArticulo = idArticulo ;
            articulo.nombreArticulo = nombreArticulo;
            articulo.categoria= categoria;

            articulo.unidadesDisponibles = unidadesDisponibles;
            articulo.precio = precio;
            articulo.status = status;
    
        
            console.log(articulo);
        
        
            const articuloRepository = getRepository(Articulo);
            try {
                const articuloContenido = await articuloRepository.find({"nombreArticulo": nombreArticulo});

                if (articuloContenido.length == 0 ){
                    

                await articuloRepository.save(articulo);
                res.send('Articulo creado');

                }
                else{
                   res.json({'Articulo ya existe: ': nombreArticulo})
                }
            } catch (e) {
                return res.status(409).json({'Error ': e.message});
            }
    
    };

    
    
    }

   



export default ArticuloController;