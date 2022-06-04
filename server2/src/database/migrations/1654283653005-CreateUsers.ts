import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1654283653005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "use_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "use_name",
                        type: "varchar",
                    },
                    {
                        name: "use_email",
                        type: "varchar"
                    },
                    {
                        name: "use_password",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "use_created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "use_update_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
