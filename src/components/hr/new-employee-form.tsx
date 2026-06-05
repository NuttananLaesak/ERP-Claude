"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createEmployee } from "@/actions/hr";

type Dept = { id: string; name: string };
type Pos = { id: string; name: string };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-indigo-500/25 py-2.5 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/35 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Saving…" : "Add Employee"}
    </button>
  );
}

const inputCls = "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 placeholder-white/25 outline-none transition-colors focus:border-indigo-500/50 focus:bg-white/[0.06]";
const labelCls = "mb-1.5 block text-xs font-medium text-white/50";

export function NewEmployeeForm({
  departments,
  positions,
}: {
  departments: Dept[];
  positions: Pos[];
}) {
  const [state, action] = useActionState(createEmployee, null);

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
      {state?.error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>Full Name *</label>
          <input name="name" required placeholder="Jane Smith" className={inputCls} />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className={labelCls}>Email *</label>
          <input name="email" type="email" required placeholder="jane@company.com" className={inputCls} />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className={labelCls}>Phone</label>
          <input name="phone" type="tel" placeholder="+1 555 000 0000" className={inputCls} />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className={labelCls}>Department *</label>
          <select name="departmentId" required className={inputCls}>
            <option value="">Select department…</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className={labelCls}>Position</label>
          <select name="positionId" className={inputCls}>
            <option value="">No position…</option>
            {positions.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className={labelCls}>Status</label>
          <select name="status" className={inputCls}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="ON_LEAVE">On Leave</option>
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className={labelCls}>Hire Date *</label>
          <input
            name="hireDate"
            type="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
            className={inputCls}
            style={{ colorScheme: "dark" }}
          />
        </div>

        <div className="col-span-2">
          <label className={labelCls}>Salary (optional)</label>
          <input name="salary" type="number" min="0" step="0.01" placeholder="75000" className={inputCls} />
        </div>

        <div className="col-span-2">
          <label className={labelCls}>Password (optional)</label>
          <input name="password" type="password" minLength={6} placeholder="Leave blank to use employee ID" className={inputCls} />
          <p className="mt-1.5 text-xs text-white/25">If blank, employee ID is set as default password.</p>
        </div>
      </div>

      {departments.length === 0 && (
        <p className="text-xs text-amber-400/80">
          No departments yet.{" "}
          <a href="/dashboard/hr/departments" className="underline hover:text-amber-400">Create one first.</a>
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
