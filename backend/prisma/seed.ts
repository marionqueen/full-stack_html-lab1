import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.employee.deleteMany();
  await prisma.leader.deleteMany();

  // Seed Employees
  const employees = [
    { name: 'Zoe Robins', department: 'Administration' },
    { name: 'Madeleine Madden', department: 'Administration' },
    { name: 'Josha Sadowski', department: 'Audit' },
    { name: 'Kate Fleetwood', department: 'Audit' },
    { name: 'Priyanka Bose', department: 'Banking Operations' },
    { name: 'Hammed Animashaun', department: 'Banking Operations' },
    { name: 'Álvaro Morte', department: 'Banking Operations' },
    { name: 'Taylor Napier', department: 'Banking Operations' },
    { name: 'Alan Simmonds', department: 'Banking Operations' },
    { name: 'Gil Cardinal', department: 'Communications' },
    { name: 'Richard J. Lewis', department: 'Communications' },
    { name: 'Randy Bradshaw', department: 'Corporate Services' },
    { name: 'Tracey Cook', department: 'Corporate Services' },
    { name: 'Lubomir Mykytiuk', department: 'Corporate Services' },
    { name: 'Dakota House', department: 'Facilities' },
    { name: 'Lori Lea Okemah', department: 'Facilities' },
    { name: 'Renae Morrisseau', department: 'Facilities' },
    { name: 'Rick Belcourt', department: 'Facilities' },
  ];

  await prisma.employee.createMany({ data: employees });

  // Seed Leaders
  const leaders = [
    {
      role: 'CEO/Chair of Board',
      name: 'Jo-Anne Sinclair',
      description: 'Chief executive officer, the highest-ranking person in a company or other institution, ultimately responsible for making managerial decisions.'
    },
    {
      role: 'COO/VP Operations',
      name: 'Jackson Smith',
      description: 'The chief operating officer (COO) is responsible for executing and implementing the operational directives set by the CEO and the board of directors.'
    },
    {
      role: 'CFO/VP Administration',
      name: 'Susan Thomas',
      description: 'A chief financial officer, a senior executive with responsibility for the financial affairs of a corporation or other institution.'
    },
    {
      role: 'CIO',
      name: 'Josee Benjamin',
      description: 'Chief Information Officer responsible for the traditional information technology and computer systems that support bank goals.'
    },
    {
      role: 'Director Information Technology',
      name: 'Sandra Bear',
      description: 'Manages the IT infrastructure, operations, and services; and how it enables businesses/individuals to access and make use of data and services.'
    },
    {
      role: 'Director Information Security and CISO',
      name: 'Gus Blue',
      description: 'A chief information security officer (CISO) is the senior-level executive within an organization responsible for establishing and maintaining the bank security vision, strategy, and program.'
    },
    {
      role: 'VP Client Services',
      name: 'Richa Kaur',
      description: 'Responsible for the Consumer Banking division performing a variety of roles including lending, investing, risk management, marketing, and technology.'
    },
    {
      role: 'VP Sales & Marketing',
      name: 'Vincent Grey',
      description: 'Responsible for the overall strategic marketing plans for an entire organization in order to attract potential customers and retain existing ones.'
    },
    {
      role: 'Director Human Resources',
      name: 'Xun Kuang',
      description: 'HR may be responsible for a number of job duties related to organizational development, recruitment and staffing, employment law, performance management.'
    }
  ];

  await prisma.leader.createMany({ data: leaders });

  console.log('Seed completed!');
  console.log(`Created ${employees.length} employees`);
  console.log(`Created ${leaders.length} leaders`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });