"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ── Departments ───────────────────────────────────────────────────────────────

const deptSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().optional(),
});

export async function createDepartment(_: unknown, formData: FormData) {
  const parsed = deptSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const exists = await db.department.findUnique({ where: { name: parsed.data.name } });
  if (exists) return { error: "Department already exists" };

  await db.department.create({ data: parsed.data });
  revalidatePath("/dashboard/hr/departments");
  return { success: true };
}

export async function deleteDepartment(id: string): Promise<void> {
  const count = await db.employee.count({ where: { departmentId: id } });
  if (count > 0) return;
  await db.department.delete({ where: { id } });
  revalidatePath("/dashboard/hr/departments");
}

export async function getDepartments() {
  const depts = await db.department.findMany({ orderBy: { name: "asc" } });
  const counts = await Promise.all(
    depts.map((d) => db.employee.count({ where: { departmentId: d.id } }))
  );
  return depts.map((d, i) => ({ ...d, _count: { employees: counts[i] } }));
}

// ── Positions ─────────────────────────────────────────────────────────────────

const positionSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().optional(),
});

export async function createPosition(_: unknown, formData: FormData) {
  const parsed = positionSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const exists = await db.position.findUnique({ where: { name: parsed.data.name } });
  if (exists) return { error: "Position already exists" };

  await db.position.create({ data: parsed.data });
  revalidatePath("/dashboard/hr/positions");
  return { success: true };
}

export async function deletePosition(id: string): Promise<void> {
  const count = await db.employee.count({ where: { positionId: id } });
  if (count > 0) return;
  await db.position.delete({ where: { id } });
  revalidatePath("/dashboard/hr/positions");
}

export async function getPositions() {
  const positions = await db.position.findMany({ orderBy: { name: "asc" } });
  const counts = await Promise.all(
    positions.map((p) => db.employee.count({ where: { positionId: p.id } }))
  );
  return positions.map((p, i) => ({ ...p, _count: { employees: counts[i] } }));
}

// ── Employees ─────────────────────────────────────────────────────────────────

const employeeSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  positionId: z.string().optional(),
  departmentId: z.string().min(1, "Department required"),
  status: z.enum(["ACTIVE", "INACTIVE", "ON_LEAVE"]).default("ACTIVE"),
  hireDate: z.string().min(1, "Hire date required"),
  salary: z.string().optional(),
});

function generateEmployeeId(): string {
  const n = Math.floor(Math.random() * 90000) + 10000;
  return `EMP-${n}`;
}

export async function createEmployee(_: unknown, formData: FormData) {
  const parsed = employeeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    positionId: formData.get("positionId") || undefined,
    departmentId: formData.get("departmentId"),
    status: formData.get("status") || "ACTIVE",
    hireDate: formData.get("hireDate"),
    salary: formData.get("salary") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const exists = await db.employee.findUnique({ where: { email: parsed.data.email } });
  if (exists) return { error: "Email already in use" };

  let employeeId = generateEmployeeId();
  while (await db.employee.findUnique({ where: { employeeId } })) {
    employeeId = generateEmployeeId();
  }

  const emailInUse = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (emailInUse) return { error: "Email already in use by an existing account" };

  const hashedPass = await bcrypt.hash(employeeId, 12);
  const user = await db.user.create({
    data: { email: parsed.data.email, name: parsed.data.name, password: hashedPass, role: "EMPLOYEE" },
  });

  await db.employee.create({
    data: {
      ...parsed.data,
      employeeId,
      hireDate: new Date(parsed.data.hireDate),
      salary: parsed.data.salary ? parseFloat(parsed.data.salary) : null,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard/hr/employees");
  revalidatePath("/dashboard/hr");
  redirect("/dashboard/hr/employees");
}

export async function updateEmployee(id: string, _: unknown, formData: FormData) {
  const parsed = employeeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    positionId: formData.get("positionId") || undefined,
    departmentId: formData.get("departmentId"),
    status: formData.get("status") || "ACTIVE",
    hireDate: formData.get("hireDate"),
    salary: formData.get("salary") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const conflict = await db.employee.findFirst({
    where: { email: parsed.data.email, NOT: { id } },
  });
  if (conflict) return { error: "Email already in use by another employee" };

  await db.employee.update({
    where: { id },
    data: {
      ...parsed.data,
      hireDate: new Date(parsed.data.hireDate),
      salary: parsed.data.salary ? parseFloat(parsed.data.salary) : null,
    },
  });

  revalidatePath(`/dashboard/hr/employees/${id}`);
  revalidatePath("/dashboard/hr/employees");
  revalidatePath("/dashboard/hr");
  redirect(`/dashboard/hr/employees/${id}`);
}

export async function updateEmployeeStatus(id: string, status: "ACTIVE" | "INACTIVE" | "ON_LEAVE"): Promise<void> {
  await db.employee.update({ where: { id }, data: { status } });
  revalidatePath("/dashboard/hr/employees");
  revalidatePath("/dashboard/hr");
}

export async function deleteEmployee(id: string): Promise<void> {
  await db.employee.delete({ where: { id } });
  revalidatePath("/dashboard/hr/employees");
  revalidatePath("/dashboard/hr");
  redirect("/dashboard/hr/employees");
}

export async function getEmployees() {
  const [employees, departments, positions] = await Promise.all([
    db.employee.findMany({ orderBy: { createdAt: "desc" } }),
    db.department.findMany(),
    db.position.findMany(),
  ]);
  const deptMap = new Map(departments.map((d) => [d.id, d]));
  const posMap = new Map(positions.map((p) => [p.id, p]));
  return employees.map((emp) => ({
    ...emp,
    department: deptMap.get(emp.departmentId)!,
    position: emp.positionId ? (posMap.get(emp.positionId) ?? null) : null,
  }));
}

export async function getEmployee(id: string) {
  const [emp, departments, positions] = await Promise.all([
    db.employee.findUnique({ where: { id } }),
    db.department.findMany(),
    db.position.findMany(),
  ]);
  if (!emp) return null;
  const deptMap = new Map(departments.map((d) => [d.id, d]));
  const posMap = new Map(positions.map((p) => [p.id, p]));
  return {
    ...emp,
    department: deptMap.get(emp.departmentId)!,
    position: emp.positionId ? (posMap.get(emp.positionId) ?? null) : null,
  };
}

export async function getHrStats() {
  const [total, active, onLeave, departments, positions] = await Promise.all([
    db.employee.count(),
    db.employee.count({ where: { status: "ACTIVE" } }),
    db.employee.count({ where: { status: "ON_LEAVE" } }),
    db.department.count(),
    db.position.count(),
  ]);
  return { total, active, onLeave, inactive: total - active - onLeave, departments, positions };
}

export async function createEmployeeLogin(id: string) {
  const emp = await db.employee.findUnique({ where: { id } });
  if (!emp) return { error: "Employee not found" };
  if (emp.userId) return { error: "Login already exists" };

  const emailInUse = await db.user.findUnique({ where: { email: emp.email } });
  if (emailInUse) return { error: "Email already in use by another account" };

  const hashedPass = await bcrypt.hash(emp.employeeId, 12);
  const user = await db.user.create({
    data: { email: emp.email, name: emp.name, password: hashedPass, role: "EMPLOYEE" },
  });
  await db.employee.update({ where: { id }, data: { userId: user.id } });

  revalidatePath(`/dashboard/hr/employees/${id}`);
  return { success: true, defaultPassword: emp.employeeId };
}

export async function getEmployeeByUserId(userId: string) {
  const emp = await db.employee.findUnique({ where: { userId } });
  if (!emp) return null;
  const [dept, pos] = await Promise.all([
    db.department.findUnique({ where: { id: emp.departmentId } }),
    emp.positionId ? db.position.findUnique({ where: { id: emp.positionId } }) : Promise.resolve(null),
  ]);
  return { ...emp, department: dept!, position: pos };
}
