#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/5e00bde6d0a719df7c78c644904ff5281171c6dc198f3360bea453e0be7e1483/contract';
import startContract from '../../snapshots/5e00bde6d0a719df7c78c644904ff5281171c6dc198f3360bea453e0be7e1483/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a2d4ae6095a6dec0698fbfc433e2d31f520b1c42cd98c7eef5516e2dbc4e089f/contract';
import endContract from '../../snapshots/a2d4ae6095a6dec0698fbfc433e2d31f520b1c42cd98c7eef5516e2dbc4e089f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('telefone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
