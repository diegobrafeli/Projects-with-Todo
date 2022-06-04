import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import {v4 as uuid} from "uuid";
import { Project } from "./Project";

@Entity("tasks")
class Task {
    @PrimaryColumn()
    readonly tas_id: string;

    @Column()
    tas_pro_id: string;

    @JoinColumn({name: "tas_pro_id"})
    @ManyToOne(() => Project)
    project: Project

    @Column()
    tas_description: string;

    @CreateDateColumn()
    tas_created_at: Date;

    @UpdateDateColumn()
    tas_updated_at: Date;

    @Column()
    tas_deleted_at: Date;

    constructor() {
        if(!this.tas_id){
            this.tas_id = uuid();
        }
    }
}

export { Task }