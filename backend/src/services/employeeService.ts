import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllEmployees() {
  return await prisma.employee.findMany({
    orderBy: { department: 'asc' }
  });
}

export async function createEmployee(name: string, department: string) {
  // Validation
  if (!name || name.trim().length < 3) {
    throw new Error('Name must be at least 3 characters');
  }
  if (!department || department.trim() === '') {
    throw new Error('Department must be selected');
  }

  return await prisma.employee.create({
    data: { name: name.trim(), department: department.trim() }
  });
}

export async function getDepartments() {
  const employees = await prisma.employee.findMany({
    select: { department: true },
    distinct: ['department']
  });
  return employees.map(e => e.department);
}

export async function searchEmployees(query: string) {
  const lowerQuery = query.toLowerCase();
  return await prisma.employee.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { department: { contains: query, mode: 'insensitive' } }
      ]
    }
  });
}