import express from 'express';
import { prisma as db } from '../lib/prisma';

const app = express.Router();
app.use(express.json());

export default app;

// POST - novo cliente
app.post('/clientes', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const novoCliente = await db.orm.public.Cliente.create({
      nomeCliente: nome,     
      emailCliente: email,
      senhaCliente: senha
    });

    console.log(`Cliente cadastrado com sucesso: ${novoCliente.emailCliente}`);
    return res.status(201).json(novoCliente);
  } catch (error: any) {
    console.error('Erro ao cadastrar cliente:', error);

    if (error?.code === 'P2002' || error?.message?.includes('unique constraint')) {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }

    return res.status(500).json({ error: 'Erro interno ao salvar cliente.' });
  }
});

// GET - listar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await db.orm.public.Cliente.all();
    return res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar clientes.' });
  }
});

// GET - buscar cliente por ID
app.get('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await db.orm.public.Cliente.where({ idCliente: Number(id) }).first();

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar cliente.' });
  }
});

// PUT - atualizar cliente por ID
app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const clienteExiste = await db.orm.public.Cliente.where({ idCliente: Number(id) }).first();

    if (!clienteExiste) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    const clienteAtualizado = await db.orm.public.Cliente
      .where({ idCliente: Number(id) })
      .update({
        nomeCliente: name,
        emailCliente: email,
        senhaCliente: password,
      });

    if (!clienteAtualizado) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    console.log(`Cliente atualizado com sucesso: ${clienteAtualizado.emailCliente}`);
    return res.status(200).json(clienteAtualizado);
  } catch (error: any) {
    console.error('Erro ao atualizar cliente:', error);

    if (error?.code === 'P2002' || error?.message?.includes('unique constraint')) {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }

    return res.status(500).json({ error: 'Erro interno ao atualizar cliente.' });
  }
});

// DELETE - remover cliente por ID
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const clienteExiste = await db.orm.public.Cliente.where({ idCliente: Number(id) }).first();

    if (!clienteExiste) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    await db.orm.public.Cliente.where({ idCliente: Number(id) }).delete();

    console.log(`Cliente removido com sucesso: id ${id}`);
    return res.status(200).json({ message: 'Cliente removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover cliente:', error);
    return res.status(500).json({ error: 'Erro interno ao remover cliente.' });
  }
});