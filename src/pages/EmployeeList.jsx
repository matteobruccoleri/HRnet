import { useState } from "react";
import Title from "../components/atoms/Title";
import styled from "styled-components";
import Search from "../components/molecules/Search";
import { useEmployees } from "../state/EmployeesStore";
import { useEmployeesTable } from "../features/useEmployeeTable";
import Button from "../components/atoms/Button";

const COLUMNS = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "startDate", label: "Start Date" },
  { key: "department", label: "Department" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
];

// Pagination "intelligente" :
// - Page 1..3 => [1,2,3,4,"…",total]
// - Page >=4 et <= total-3 => [1,"…",p-1,p,p+1,"…",total]
// - Dernières pages => [1,"…",total-3,total-2,total-1,total]
function getSmartPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, "…", total];

  if (current >= total - 2)
    return [1, "…", total - 3, total - 2, total - 1, total];

  return [1, "…", current - 1, current, current + 1, "…", total];
}

function EmployeeList() {
  const employees = useEmployees();

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: "firstName", dir: "asc" });

  const { rows: pageRows, total, totalPages, currentPage, startIndex } =
    useEmployeesTable(employees, {
      search,
      sortKey: sort.key,
      sortDir: sort.dir,
      page,
      pageSize,
    });

  function toggleSort(key) {
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
    setPage(1);
  }

  function sortIndicator(colKey) {
    if (sort.key !== colKey) return "⇅";
    return sort.dir === "asc" ? "▲" : "▼";
  }

  return (
    <StyledEmployeeList>
      <Title>Current Employees</Title>

      <StyledShowAndSearch>
        <StyledShow>
          Show
          <select
            id="page-size"
            name="page-size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>{" "}
          entries
        </StyledShow>

        <Search
          value={search}
          placeholder="Search employees…"
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </StyledShowAndSearch>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  onClick={() => toggleSort(c.key)}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    textAlign: "left",
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <strong>{c.label}</strong>
                    <span style={{ opacity: 0.6 }}>{sortIndicator(c.key)}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} style={{ padding: 12, textAlign: "center" }}>
                  No data available in table
                </td>
              </tr>
            ) : (
              pageRows.map((e, i) => (
                <tr key={e.id ?? i}>
                  {COLUMNS.map((c) => (
                    <td
                      key={c.key}
                      style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                    >
                      {e[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableContainer>

      <StyledPaginationWrapper>
        <div>
          {total === 0
            ? "Showing 0 to 0 of 0 entries"
            : `Showing ${startIndex + 1} to ${Math.min(
                startIndex + pageSize,
                total
              )} of ${total} entries`}
        </div>

        {/* --- pagination --- */}
        <StyledPagination>
          <Button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {getSmartPages(currentPage, totalPages).map((item, i) => {
            const isNumber = typeof item === "number";
            const isActive = isNumber && item === currentPage;
            return (
              <span
                key={`${item}-${i}`}
                onClick={() => isNumber && setPage(item)}
                style={{
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#3b8e00" : "#ccc",
                  cursor: isNumber ? "pointer" : "default",
                  padding: "2px 6px",
                  userSelect: "none",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {item}
              </span>
            );
          })}

          <Button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </StyledPagination>
      </StyledPaginationWrapper>
    </StyledEmployeeList>
  );
}

export default EmployeeList;

const StyledEmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const TableContainer = styled.div`
  scrollbar-width: none;
  overflow-x: scroll;

  @media (min-width: 1280px) {
    width: 100%;
  }
`;

const StyledTable = styled.table`
  border: 1px solid #00000044;
  border-radius: 0.5rem;
  padding: 10px;
  width: 1280px;

  @media (min-width: 1280px) {
    width: 100%;
  }
`;

const StyledPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
`
const StyledShowAndSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
`

const StyledShow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;  
`

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;  
`