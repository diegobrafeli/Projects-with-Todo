import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import {v4 as uuid} from "uuid";
import { User } from "./User";

@Entity("projects")
class Project {
    @PrimaryColumn()
    readonly pro_id: string;

    @Column()
    pro_use_id: string;

    @JoinColumn({name: "pro_use_id"})
    @ManyToOne(() => User)
    user: User

    @Column()
    pro_project: string;

    @CreateDateColumn()
    pro_created_at: Date;

    @UpdateDateColumn()
    pro_updated_at: Date;

    @Column()
    pro_deleted_at: Date;

    constructor() {
        if(!this.pro_id){
            this.pro_id = uuid();
        }
    }
}

export { Project }