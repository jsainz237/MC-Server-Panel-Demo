import { Model, Table, PrimaryKey, AllowNull, Column, DataType, AutoIncrement, Unique, Index } from "sequelize-typescript";

/** Node attributes interface */
export interface MCNodeAttr {
    node_id: number;
    free_ram: string;
    assigned_ram: string;
    free_disk: string;
    used_disk: string;
    cpu_load: string;
    cpu_perc: string;
    mc_servers: string[];
}

/** Database definition of Node */
@Table({ timestamps: true, updatedAt: false, tableName: 'nodes' })
export default class MCNode extends Model<MCNode> implements MCNodeAttr {

    @PrimaryKey
    @Unique
    @AllowNull(false)
    @AutoIncrement
    @Column
    id!: number;
    
    @Index
    @AllowNull(false)
    @Column
    node_id!: number;

    @AllowNull(false)
    @Column
    free_ram!: string;

    @AllowNull(false)
    @Column
    assigned_ram!: string;

    @AllowNull(false)
    @Column
    free_disk!: string;

    @AllowNull(false)
    @Column
    used_disk!: string;

    @AllowNull(false)
    @Column
    cpu_load!: string;

    @AllowNull(false)
    @Column
    cpu_perc!: string;

    @AllowNull(false)
    @Column(DataType.ARRAY(DataType.STRING))
    mc_servers!: string[];
    
}