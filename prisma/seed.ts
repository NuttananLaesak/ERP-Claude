import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

// ── Departments ───────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  { name: "Engineering",  description: "Software development and infrastructure" },
  { name: "Design",       description: "UI/UX and product design" },
  { name: "Product",      description: "Product management and strategy" },
  { name: "Sales",        description: "Business development and client acquisition" },
  { name: "Operations",   description: "Finance, HR, and administration" },
];

// ── Positions ─────────────────────────────────────────────────────────────────

const POSITIONS = [
  { name: "Lead Engineer",          description: "Technical lead for engineering squads" },
  { name: "Backend Developer",      description: "Server-side and API development" },
  { name: "Frontend Developer",     description: "UI and client-side development" },
  { name: "DevOps Engineer",        description: "Infrastructure, CI/CD, and reliability" },
  { name: "Head of Design",         description: "Design team lead and creative direction" },
  { name: "UX Designer",            description: "User experience and interface design" },
  { name: "Product Manager",        description: "Product strategy and roadmap ownership" },
  { name: "Product Analyst",        description: "Data analysis and product insights" },
  { name: "Sales Director",         description: "Sales strategy and team leadership" },
  { name: "Account Executive",      description: "Client acquisition and account management" },
  { name: "Sales Representative",   description: "Direct sales and prospecting" },
  { name: "COO",                    description: "Chief Operating Officer" },
  { name: "HR Manager",             description: "Human resources and people operations" },
];

// ── Employees ─────────────────────────────────────────────────────────────────

const EMPLOYEES: Array<{
  name: string; email: string; phone: string;
  pos: string; dept: string; hire: string; salary: number;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
}> = [
  // Engineering
  { name: "Alice Chen",     email: "alice@company.com",   phone: "+1 415 555 0101", pos: "Lead Engineer",        dept: "Engineering", hire: "2022-03-15", salary: 120000, status: "ACTIVE" },
  { name: "Bob Martinez",   email: "bob@company.com",     phone: "+1 415 555 0102", pos: "Backend Developer",    dept: "Engineering", hire: "2022-09-01", salary: 95000,  status: "ACTIVE" },
  { name: "Carol White",    email: "carol@company.com",   phone: "+1 415 555 0103", pos: "Frontend Developer",   dept: "Engineering", hire: "2023-01-10", salary: 90000,  status: "ACTIVE" },
  { name: "David Kim",      email: "david@company.com",   phone: "+1 415 555 0104", pos: "DevOps Engineer",      dept: "Engineering", hire: "2023-06-05", salary: 105000, status: "ON_LEAVE" },
  // Design
  { name: "Eva Santos",     email: "eva@company.com",     phone: "+1 415 555 0201", pos: "Head of Design",       dept: "Design",      hire: "2021-11-20", salary: 110000, status: "ACTIVE" },
  { name: "Frank Liu",      email: "frank@company.com",   phone: "+1 415 555 0202", pos: "UX Designer",          dept: "Design",      hire: "2023-02-14", salary: 85000,  status: "ACTIVE" },
  // Product
  { name: "Grace Park",     email: "grace@company.com",   phone: "+1 415 555 0301", pos: "Product Manager",      dept: "Product",     hire: "2022-07-01", salary: 115000, status: "ACTIVE" },
  { name: "Henry Brown",    email: "henry@company.com",   phone: "+1 415 555 0302", pos: "Product Analyst",      dept: "Product",     hire: "2024-01-08", salary: 80000,  status: "ACTIVE" },
  // Sales
  { name: "Iris Johnson",   email: "iris@company.com",    phone: "+1 415 555 0401", pos: "Sales Director",       dept: "Sales",       hire: "2021-05-15", salary: 130000, status: "ACTIVE" },
  { name: "Jake Wilson",    email: "jake@company.com",    phone: "+1 415 555 0402", pos: "Account Executive",    dept: "Sales",       hire: "2023-08-20", salary: 75000,  status: "ACTIVE" },
  { name: "Karen Davis",    email: "karen@company.com",   phone: "+1 415 555 0403", pos: "Sales Representative", dept: "Sales",       hire: "2024-03-01", salary: 65000,  status: "INACTIVE" },
  // Operations
  { name: "Leo Taylor",     email: "leo@company.com",     phone: "+1 415 555 0501", pos: "COO",                  dept: "Operations",  hire: "2020-08-01", salary: 160000, status: "ACTIVE" },
  { name: "Mia Anderson",   email: "mia@company.com",     phone: "+1 415 555 0502", pos: "HR Manager",           dept: "Operations",  hire: "2022-04-11", salary: 88000,  status: "ACTIVE" },
];

// ── Login users ───────────────────────────────────────────────────────────────

const USERS = [
  { name: "Admin User", email: "admin@company.com", password: "password123", role: "ADMIN" as const },
  { name: "Demo User",  email: "demo@company.com",  password: "password123", role: "DEMO"  as const },
];

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  const clean = process.argv.includes("--clean");

  if (clean) {
    console.log("Cleaning HR data…");
    await (prisma as any).employee.deleteMany();
    await (prisma as any).position.deleteMany();
    await (prisma as any).department.deleteMany();
    console.log("  ✓ Cleared employees, positions, departments");
  }

  console.log("Seeding…");

  // Admin users
  for (const u of USERS) {
    const exists = await (prisma as any).user.findUnique({ where: { email: u.email } });
    if (!exists) {
      await (prisma as any).user.create({
        data: { name: u.name, email: u.email, password: await bcrypt.hash(u.password, 12), role: u.role },
      });
      console.log(`  ✓ user: ${u.email} (${u.role})`);
    } else {
      await (prisma as any).user.update({ where: { email: u.email }, data: { role: u.role } });
      console.log(`  – upsert user: ${u.email} (ensured ${u.role})`);
    }
  }

  // Departments
  const deptMap = new Map<string, string>();
  for (const d of DEPARTMENTS) {
    const dept = await (prisma as any).department.upsert({
      where: { name: d.name }, update: {}, create: d,
    });
    deptMap.set(d.name, dept.id);
    console.log(`  ✓ dept: ${d.name}`);
  }

  // Positions
  const posMap = new Map<string, string>();
  for (const p of POSITIONS) {
    const pos = await (prisma as any).position.upsert({
      where: { name: p.name }, update: {}, create: p,
    });
    posMap.set(p.name, pos.id);
    console.log(`  ✓ position: ${p.name}`);
  }

  // Employees + login accounts
  let empIndex = 10001;
  for (const e of EMPLOYEES) {
    const exists = await (prisma as any).employee.findUnique({ where: { email: e.email } });
    if (!exists) {
      const employeeId = `EMP-${empIndex++}`;

      const userExists = await (prisma as any).user.findUnique({ where: { email: e.email } });
      let userId: string | null = userExists?.id ?? null;
      if (!userExists) {
        const user = await (prisma as any).user.create({
          data: { name: e.name, email: e.email, password: await bcrypt.hash("password123", 12), role: "EMPLOYEE" },
        });
        userId = user.id;
      }

      await (prisma as any).employee.create({
        data: {
          employeeId,
          name:         e.name,
          email:        e.email,
          phone:        e.phone,
          positionId:   posMap.get(e.pos)!,
          departmentId: deptMap.get(e.dept)!,
          hireDate:     new Date(e.hire),
          salary:       e.salary,
          status:       e.status,
          userId,
        },
      });
      console.log(`  ✓ employee: ${e.name} (${employeeId})`);
    } else {
      empIndex++;
      console.log(`  – skip employee: ${e.name} (exists)`);
    }
  }

  console.log("Done.");
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await (prisma as any).$disconnect(); });
