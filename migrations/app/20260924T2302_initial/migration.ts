#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5e00bde6d0a719df7c78c644904ff5281171c6dc198f3360bea453e0be7e1483/contract';
import endContract from '../../snapshots/5e00bde6d0a719df7c78c644904ff5281171c6dc198f3360bea453e0be7e1483/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'cliente',
        columns: [
          col('cliente_email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('cliente_nome', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('cliente_password', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('id_cliente', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id_cliente'], { name: 'cliente_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'telefone_cliente',
        columns: [
          col('id_cliente', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('id_telefone_cliente', 'numeric', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1' },
          }),
          col('telefone_cliente', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
        ],
        constraints: [primaryKey(['id_telefone_cliente'], { name: 'telefone_cliente_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'], { name: 'user_pkey' })],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
