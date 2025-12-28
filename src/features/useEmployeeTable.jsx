import { useMemo } from "react";

export function useEmployeesTable(
  employees,
  { search, sortKey, sortDir, page, pageSize }
) {
  // Filtrage par recherche textuelle
  const filtered = useMemo(() => {
    const q = (search ?? "").trim().toLowerCase();
    if (!q) return employees;

    return employees.filter((e) =>
      Object.values(e).some((v) => (v ?? "").toString().toLowerCase().includes(q))
    );
  }, [employees, search]);

  // Tri des résultats
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const dir = sortDir === "desc" ? -1 : 1;

    return [...filtered].sort((a, b) => {
      const av = (a?.[sortKey] ?? "").toString().toLowerCase();
      const bv = (b?.[sortKey] ?? "").toString().toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  // Calcul de la pagination
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  // Extraction de la page courante
  const rows = useMemo(
    () => sorted.slice(startIndex, startIndex + pageSize),
    [sorted, startIndex, pageSize]
  );

  return { rows, total, totalPages, currentPage, startIndex };
}
