import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllLeaders() {
  return await prisma.leader.findMany({
    orderBy: { role: 'asc' }
  });
}

export async function createLeader(role: string, name: string, description: string) {
  // Validation
  if (!role || role.trim() === '') {
    throw new Error('Role must be selected');
  }
  if (!name || name.trim().length < 3) {
    throw new Error('Name must be at least 3 characters');
  }
  if (!description || description.trim().length < 3) {
    throw new Error('Description must be at least 3 characters');
  }

  // Check if role is already filled
  const existing = await prisma.leader.findUnique({ where: { role } });
  if (existing && existing.name.trim() !== '') {
    throw new Error('This role is already filled');
  }

  // Update if exists (vacant), create if new
  if (existing) {
    return await prisma.leader.update({
      where: { role },
      data: { name: name.trim(), description: description.trim() }
    });
  } else {
    return await prisma.leader.create({
      data: { role: role.trim(), name: name.trim(), description: description.trim() }
    });
  }
}

export async function searchLeaders(query: string) {
  return await prisma.leader.findMany({
    where: {
      OR: [
        { role: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } }
      ]
    }
  });
}