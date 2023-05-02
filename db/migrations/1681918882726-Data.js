module.exports = class Data1681918882726 {
    name = 'Data1681918882726'

    async up(db) {
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "chain" text, "block_id" integer NOT NULL, "from" text, "to" text, "input" text, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "transaction"`)
    }
}
