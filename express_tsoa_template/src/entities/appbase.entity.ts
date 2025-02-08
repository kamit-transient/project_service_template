import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class AppBaseEntity {

    @PrimaryGeneratedColumn('uuid', { name: "id" })
    id!: string;  // UUID should match Appwrite's ID format

    @Column("varchar", { nullable: true })
    createdBy: string;

    @Column("varchar", { nullable: true })
    deletedBy: string;

    @CreateDateColumn({ type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamptz" })
    deletedAt!: Date;
}

