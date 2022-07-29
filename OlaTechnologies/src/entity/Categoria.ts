import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, OneToMany} from "typeorm";
import {IsNotEmpty} from 'class-validator';

//TODO NECESITA VALIDACION DE RFC

@Entity()
@Unique(['idCategoria'])
export class Categoria {

    @PrimaryGeneratedColumn()
    idCategoria: number;

    @Column()
    nombreCategoria: string;

    @Column()
    @IsNotEmpty()
    status: number;

}
