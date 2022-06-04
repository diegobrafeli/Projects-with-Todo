import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProjects1654295461094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects",
                columns: [
                    {
                        name: "pro_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "pro_use_id",
                        type: "uuid"
                    },
                    {
                        name: "pro_project",
                        type: "varchar",
                    },
                    {
                        name: "pro_created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "pro_updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "pro_deleted_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
                    },

                ],
                foreignKeys: [
                    {
                        name: "FKpro_use_id",
                        referencedTableName: "users",
                        referencedColumnNames: ["use_id"],
                        columnNames: ["pro_use_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projects');
    }

}
