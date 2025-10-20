import { useMemo } from "react";

/**
 * Hook pour gérer filtre, tri et pagination d'une liste d'employés.
 *
 * @param {Array<object>} employees - Liste complète (source de vérité)
 * @param {object} opts
 * @param {string}   opts.search   - Terme de recherche (toutes colonnes)
 * @param {string}   opts.sortKey  - Clé de tri (ex: 'firstName')
 * @param {'asc'|'desc'} opts.sortDir - Direction du tri
 * @param {number}   opts.page     - Numéro de page (1-based)
 * @param {number}   opts.pageSize - Taille de page
 *
 * @returns {object} { rows, total, totalPages, currentPage, startIndex }
 */
export function useEmployeesTable(
  employees,
  { search, sortKey, sortDir, page, pageSize }
) {
  const filtered = useMemo(() => {
    const q = (search ?? "").trim().toLowerCase();
    if (!q) return employees;

    return employees.filter((e) =>
      Object.values(e).some((v) => (v ?? "").toString().toLowerCase().includes(q))
    );
  }, [employees, search]);

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

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const rows = useMemo(
    () => sorted.slice(startIndex, startIndex + pageSize),
    [sorted, startIndex, pageSize]
  );

  return { rows, total, totalPages, currentPage, startIndex };
}
