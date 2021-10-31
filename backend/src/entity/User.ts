import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class BankExport {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName:string
    
    @Column()
    imported:boolean
    
    @Column()
    dateImported:Date

}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
