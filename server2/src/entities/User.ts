import { Exclude } from "class-transformer";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    readonly use_id: string;

    @Column()
    use_name: string;

    @Column()
    use_email: string;

    @Exclude()
    @Column()
    use_password: string;

    @CreateDateColumn()
    use_created_at: Date;

    @UpdateDateColumn()
    use_update_at: Date;

    constructor() {
        if(!this.use_id){
            this.use_id = uuid();
        }
    }

}
 export { User }