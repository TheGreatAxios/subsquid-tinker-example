import {EvmBatchProcessor} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import { Transaction } from './model';

const nebulaProcessor = new EvmBatchProcessor()
  .setDataSource({
    archive: lookupArchive('skale-nebula'),
  })
  .setBlockRange({ from: 1_500_000 })
  .addTransaction([], {
    range: {
      from: 1_500_000
    },
    data: {
      transaction: {
        id: true, /// string
        from: true, /// string
        input: true, /// string
        to: true,
        chainId: true,
        v: true
      }
    }
  })

  nebulaProcessor.run(new TypeormDatabase(), async (ctx) => {
  ctx.blocks.map(async(block) => {
    block.items.map(async(item) => {
      if (item.kind === "transaction") {
        console.log(item.transaction.v);
        await ctx.store.save(new Transaction({
          ...item.transaction,
          blockId: block.header.height,
          chain: "green-giddy-denebola"
        }))
      }
    })
  })
});

// const calypsoProcessor = new EvmBatchProcessor()
//   .setDataSource({
//     archive: lookupArchive('skale-calypso'),
//   })
//   .setBlockRange({ from: 1_500_000 })
//   .addTransaction([], {
//     range: {
//       from: 1_500_000
//     },
//     data: {
//       transaction: {
//         id: true, /// string
//         from: true, /// string
//         input: true, /// string
//         to: true,
//         chainId: true,
//         v: true
//       }
//     }
//   })

//   calypsoProcessor.run(new TypeormDatabase(), async (ctx) => {
//   ctx.blocks.map(async(block) => {
//     block.items.map(async(item) => {
//       if (item.kind === "transaction") {
//         console.log(item.transaction.v);
//         await ctx.store.save(new Transaction({
//           ...item.transaction,
//           blockId: block.header.height,
//           chain: "honorable-steel-rasalhague"
//         }))
//       }
//     })
//   })
// });