import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('uuid')
export class BankExport {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column()
    imported: boolean;

    @Column()
    dateImported: Date;

}
