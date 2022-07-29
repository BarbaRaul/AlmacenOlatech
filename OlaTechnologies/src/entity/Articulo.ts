import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, OneToMany, Double} from "typeorm";
import {IsNotEmpty} from 'class-validator';


@Entity()
@Unique(['idArticulo'])
export class Articulo {

    @PrimaryGeneratedColumn()
    idArticulo: number;

    @Column()
    @IsNotEmpty()
    nombreArticulo: string;

    @Column(
        {default: "Sin categoria"}
    )
    @IsNotEmpty()
    categoria: string;

    @Column()
    @IsNotEmpty()
    unidadesDisponibles: number;

    @Column()
    @IsNotEmpty()
    precio: string;

    @Column()
    @IsNotEmpty()
    status: number;

}