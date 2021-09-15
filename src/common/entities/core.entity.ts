import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


export class CoreEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}

function UpdatedDateColumn() {
    throw new Error("Function not implemented.");
}
