"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Organization } from "../_lib/organizations";

const LEVELS = [
  { key: "entity_name", label: "Entity" },
  { key: "department_name", label: "Department" },
  { key: "section_name", label: "Section" },
  { key: "unit_name", label: "Unit" },
  { key: "sub_unit_name", label: "Sub unit" },
] as const;

function getFilteredOrgs(
  orgs: Organization[],
  selections: (string | null)[]
): Organization[] {
  return orgs.filter((org) => {
    for (let i = 0; i < LEVELS.length; i++) {
      const sel = selections[i];
      if (sel == null || sel === "") return true;
      const val = org[LEVELS[i].key];
      if (val == null || val === "") return false;
      if (String(val).trim() !== String(sel).trim()) return false;
    }
    return true;
  });
}

function getOptionsForLevel(
  orgs: Organization[],
  levelIndex: number,
  selections: (string | null)[]
): string[] {
  const filtered =
    levelIndex === 0
      ? orgs
      : orgs.filter((org) => {
          for (let i = 0; i < levelIndex; i++) {
            const sel = selections[i];
            if (sel == null || sel === "") return false;
            const val = org[LEVELS[i].key];
            if (val == null || val === "") return false;
            if (String(val).trim() !== String(sel).trim()) return false;
          }
          return true;
        });
  const key = LEVELS[levelIndex].key;
  const set = new Set<string>();
  for (const org of filtered) {
    const v = org[key];
    if (v != null && String(v).trim() !== "") set.add(String(v).trim());
  }
  return Array.from(set).sort();
}

function shouldShowLevel(
  orgs: Organization[],
  levelIndex: number,
  selections: (string | null)[]
): boolean {
  if (levelIndex === 0) return true;
  const prev = selections[levelIndex - 1];
  if (prev == null || prev === "") return false;
  const options = getOptionsForLevel(orgs, levelIndex, selections);
  return options.length > 0;
}

export interface CascadingOrgSelectProps {
  organizations: Organization[];
  value: string | null;
  onChange: (id: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function CascadingOrgSelect({
  organizations,
  value,
  onChange,
  placeholder = "Select…",
  disabled = false,
  className,
}: CascadingOrgSelectProps) {
  const [selections, setSelections] = React.useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  React.useEffect(() => {
    if (!value || organizations.length === 0) return;
    const org = organizations.find((o) => o.id === value);
    if (org) {
      setSelections([
        org.entity_name ?? null,
        org.department_name ?? null,
        org.section_name ?? null,
        org.unit_name ?? null,
        org.sub_unit_name ?? null,
      ]);
    }
  }, [value, organizations]);

  const handleLevelChange = (levelIndex: number, val: string) => {
    const next = [...selections];
    next[levelIndex] = val;
    for (let i = levelIndex + 1; i < LEVELS.length; i++) next[i] = null;
    setSelections(next);

    const filtered = getFilteredOrgs(organizations, next);
    if (filtered.length === 1) {
      onChange(filtered[0].id);
    } else if (filtered.length > 1) {
      onChange(null);
    } else {
      onChange(null);
    }
  };

  const filteredOrgs = getFilteredOrgs(organizations, selections);
  const showFinalDropdown = filteredOrgs.length > 1;

  const triggerClass =
    "h-[77px] w-full min-w-[140px] border-[#E9A3FB] bg-transparent text-[#E9A3FB] focus:ring-[#E9A3FB]/40 data-[placeholder]:text-[#E9A3FB]/60";
  const contentClass = "border-[#E9A3FB]/50 bg-black";
  const itemClass = "text-[#E9A3FB] focus:bg-[#E9A3FB]/20 focus:text-[#E9A3FB]";

  if (organizations.length === 0) {
    return (
      <div className={className}>
        <p className="text-sm text-[#E9A3FB]/60">No organizations available.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {LEVELS.map((level, levelIndex) => {
          if (!shouldShowLevel(organizations, levelIndex, selections))
            return null;
          const options = getOptionsForLevel(organizations, levelIndex, selections);
          const isDisabled = disabled || (levelIndex > 0 && !selections[levelIndex - 1]);
          return (
            <div key={level.key} className="space-y-1">
              <label className="text-xs text-[#E9A3FB]/80 capitalize">
                {level.label}
              </label>
              <Select
                value={selections[levelIndex] ?? ""}
                onValueChange={(val) => handleLevelChange(levelIndex, val)}
                disabled={isDisabled}
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue placeholder={levelIndex === 0 ? placeholder : `Select ${level.label}`} />
                </SelectTrigger>
                <SelectContent className={contentClass}>
                  {options.map((opt) => (
                    <SelectItem
                      key={opt}
                      value={opt}
                      className={itemClass}
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })}
        {showFinalDropdown && (
          <div className="space-y-1">
            <label className="text-xs text-[#E9A3FB]/80">Organization</label>
            <Select
              value={value ?? ""}
              onValueChange={(id) => onChange(id || null)}
              disabled={disabled}
            >
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent className={contentClass}>
                {filteredOrgs.map((org) => (
                  <SelectItem
                    key={org.id}
                    value={org.id}
                    className={itemClass}
                  >
                    {org.name || org.entity_name || org.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
