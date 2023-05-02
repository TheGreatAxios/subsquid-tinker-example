import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class Transaction {
    constructor(props?: Partial<Transaction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: true})
    chain!: string | undefined | null

    @Column_("int4", {nullable: false})
    blockId!: number

    @Column_("text", {nullable: true})
    from!: string | undefined | null

    @Column_("text", {nullable: true})
    to!: string | undefined | null

    @Column_("text", {nullable: true})
    input!: string | undefined | null
}
