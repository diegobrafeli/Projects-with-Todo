import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTasks1654303353716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "tas_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "tas_pro_id",
                        type: "uuid"
                    },
                    {
                        name: "tas_description",
                        type: "varchar",
                    },
                    {
                        name: "tas_created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "tas_updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "tas_deleted_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
                    },

                ],
                foreignKeys: [
                    {
                        name: "FKtas_pro_id",
                        referencedTableName: "projects",
                        referencedColumnNames: ["pro_id"],
                        columnNames: ["tas_pro_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
    }

}
