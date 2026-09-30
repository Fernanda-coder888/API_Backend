import { prisma as db } from '../lib/prisma';
import bcrypt from 'bcrypt';

export class ClienteService {
  // 1. CRIAR CLIENTE
  static async createCliente(data: any) {
    // Regra de Negócio: Encriptar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(data.senhaCliente, 10);

    const novoCliente = await db.orm.public.Cliente.create({
      nomeCliente: data.nomeCliente,
      emailCliente: data.emailCliente,
      senhaCliente: hashedPassword,
    });

    return novoCliente;
  }

  // 2. LISTAR TODOS OS CLIENTES
  static async getAllClientes() {
    return await db.orm.public.Cliente.all();
  }

  // 3. BUSCAR CLIENTE POR ID
  static async getClienteById(idCliente: number) {
    const cliente = await db.orm.public.Cliente.first({ idCliente });
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }
    return cliente;
  }

  // 4. ATUALIZAR CLIENTE
  static async updateCliente(idCliente: number, data: any) {
    // Verifica se o cliente existe primeiro
    const clienteExiste = await db.orm.public.Cliente.first({ idCliente });
    if (!clienteExiste) {
      throw new Error('Cliente não encontrado.');
    }

    const dataToUpdate = { ...data };

    // Se o cliente mandou uma nova senha, encripta também
    if (data.password) {
      dataToUpdate.password = await bcrypt.hash(data.password, 10);
    }

    const clienteAtualizado = await db.orm.public.Cliente
      .where({ idCliente })
      .update(dataToUpdate);

    if (!clienteAtualizado) {
      throw new Error('Cliente não encontrado.');
    }

    return clienteAtualizado;
  }

  // 5. REMOVER CLIENTE
  static async deleteCliente(idCliente: number) {
    const clienteExiste = await db.orm.public.Cliente.first({ idCliente });
    if (!clienteExiste) {
      throw new Error('Cliente não encontrado.');
    }

    await db.orm.public.Cliente.where({ idCliente }).delete();
    return true;
  }
}