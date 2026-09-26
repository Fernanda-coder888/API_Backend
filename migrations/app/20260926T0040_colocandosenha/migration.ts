#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0a290316529d86579865bf5b51988c540098ed83fead7cbe86cf7da4a8c6ef95/contract';
import startContract from '../../snapshots/0a290316529d86579865bf5b51988c540098ed83fead7cbe86cf7da4a8c6ef95/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/262bbb631fd13107fdb0eec0d8e1234272bf27806a7b6d248c4ccd016fb8b164/contract';
import endContract from '../../snapshots/262bbb631fd13107fdb0eec0d8e1234272bf27806a7b6d248c4ccd016fb8b164/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'cliente',
        column: col('senha_cliente', 'character varying', {
          codecRef: { codecId: 'sql/varchar@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
