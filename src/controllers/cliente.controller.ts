import { Request, Response } from 'express';
import { ClienteService } from '../services/cliente.service';

export class ClienteController {
  // POST - criar novo cliente
  static async createCliente(req: Request, res: Response) {
    const { nomeCliente, emailCliente, senhaCliente } = req.body;

    try {
      const novoCliente = await ClienteService.createCliente({ nomeCliente, emailCliente, senhaCliente });
      
      console.log(`Cliente criado com sucesso: ${novoCliente.emailCliente}`);
      return res.status(201).json(novoCliente);
    } catch (error: any) {
      console.error('Erro ao criar cliente:', error);

      if (error?.sqlState === '23505' || error?.code === 'P2002' || error?.message?.includes('unique constraint')) {
        return res.status(409).json({ error: 'Este e-mail já está em uso.' });
      }

      return res.status(500).json({ error: 'Erro interno ao salvar cliente.' });
    }
  }

  // GET - listar todos os clientes
  static async getAllClientes(req: Request, res: Response) {
    try {
      const clientes = await ClienteService.getAllClientes();
      return res.status(200).json(clientes);
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar clientes.' });
    }
  }

  // GET - buscar cliente por ID
  static async getClienteById(req: Request, res: Response) {
    const { idCliente } = req.params;

    try {
      const cliente = await ClienteService.getClienteById(Number(idCliente));
      return res.status(200).json(cliente);
    } catch (error: any) {
      console.error('Erro ao buscar cliente:', error);
      
      if (error.message === 'Cliente não encontrado.') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno ao buscar cliente.' });
    }
  }

  // PUT - atualizar cliente por ID
  static async updateCliente(req: Request, res: Response) {
    const { idCliente } = req.params;
    const { nomeCliente, emailCliente, senhaCliente } = req.body;

    try {
      const clienteAtualizado = await ClienteService.updateCliente(Number(idCliente), { nomeCliente, emailCliente, senhaCliente });
      
      console.log(`Cliente atualizado com sucesso: ${clienteAtualizado.emailCliente}`);
      return res.status(200).json(clienteAtualizado);
    } catch (error: any) {
      console.error('Erro ao atualizar cliente:', error);

      if (error.message === 'Cliente não encontrado.') {
        return res.status(404).json({ error: error.message });
      }
      if (error?.sqlState === '23505' || error?.code === 'P2002' || error?.message?.includes('unique constraint')) {
        return res.status(409).json({ error: 'Este e-mail já está em uso.' });
      }

      return res.status(500).json({ error: 'Erro interno ao atualizar cliente.' });
    }
  }

  // DELETE - remover cliente por ID
  static async deleteCliente(req: Request, res: Response) {
    const { idCliente } = req.params;

    try {
      await ClienteService.deleteCliente(Number(idCliente));
      
      console.log(`Cliente removido com sucesso: id ${idCliente}`);
      return res.status(200).json({ message: 'Cliente removido com sucesso.' });
    } catch (error: any) {
      console.error('Erro ao remover cliente:', error);
      
      if (error.message === 'Cliente não encontrado.') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno ao remover cliente.' });
    }
  }
}