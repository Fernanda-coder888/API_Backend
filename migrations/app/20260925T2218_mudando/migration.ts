#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0a290316529d86579865bf5b51988c540098ed83fead7cbe86cf7da4a8c6ef95/contract';
import endContract from '../../snapshots/0a290316529d86579865bf5b51988c540098ed83fead7cbe86cf7da4a8c6ef95/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a2d4ae6095a6dec0698fbfc433e2d31f520b1c42cd98c7eef5516e2dbc4e089f/contract';
import startContract from '../../snapshots/a2d4ae6095a6dec0698fbfc433e2d31f520b1c42cd98c7eef5516e2dbc4e089f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'cliente', column: 'cliente_email' }),
      this.dropColumn({ schema: 'public', table: 'cliente', column: 'cliente_nome' }),
      this.dropColumn({ schema: 'public', table: 'cliente', column: 'cliente_password' }),
      this.dropTable({ schema: 'public', table: 'telefone_cliente' }),
      this.dropColumn({ schema: 'public', table: 'user', column: 'telefone' }),
      this.createTable({
        schema: 'public',
        table: 'tel_cliente',
        columns: [
          col('id_cliente', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_tel_cliente', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id_tel_cliente'], { name: 'tel_cliente_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'teste',
        columns: [
          col('id_Teste', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nome_test', 'character varying', { codecRef: { codecId: 'sql/varchar@1' } }),
        ],
        constraints: [primaryKey(['id_Teste'], { name: 'idTeste_pkey' })],
      }),
      this.addColumn({
        schema: 'public',
        table: 'cliente',
        column: col('email_cliente', 'character varying', {
          codecRef: { codecId: 'sql/varchar@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cliente',
        column: col('nome_cliente', 'character varying', {
          codecRef: { codecId: 'sql/varchar@1' },
        }),
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'tel_cliente',
        foreignKey: {
          name: 'cliente_fk',
          columns: ['id_cliente'],
          references: { schema: 'public', table: 'cliente', columns: ['id_cliente'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
