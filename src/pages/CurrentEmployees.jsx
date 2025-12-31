import { useState } from "react";
import Title from "../components/atoms/Title";
import styled from "styled-components";
import Search from "../components/molecules/Search";
import { useEmployeesContext } from "../store/EmployeesContext";
import { useEmployeesTable } from "../hooks/useEmployeesTable";
import PaginationControls from "../components/molecules/PaginationControls";

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

function CurrentEmployees() {
  const { employees } = useEmployeesContext();

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
    <EmployeeList>

      <Title>Current Employees</Title>
        <ShowAndSearch>
          <Show>
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
          </Show>
          <Search
            value={search}
            placeholder="Search…"
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
      />
        </ShowAndSearch>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <StyledTableHeader
                  key={c.key}
                  onClick={() => toggleSort(c.key)}
                >
                  <HeaderContent>
                    <strong>{c.label}</strong>
                    <SortIndicator>{sortIndicator(c.key)}</SortIndicator>
                  </HeaderContent>
                </StyledTableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <EmptyCell colSpan={COLUMNS.length}>
                  No data available in table
                </EmptyCell>
              </tr>
            ) : (
              pageRows.map((e, i) => (
                <tr key={e.id ?? i}>
                  {COLUMNS.map((c) => (
                    <StyledTableCell key={c.key}>
                      {e[c.key]}
                    </StyledTableCell>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableContainer>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        startIndex={startIndex}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </EmployeeList>
  );
}

export default CurrentEmployees;

const EmployeeList = styled.div`
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
  border: 1px solid #d9d9d9;
  border-radius: 0.8rem;
  padding: 0;
  width: 1280px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;

  @media (min-width: 1280px) {
    width: 100%;
  }
`;

const ShowAndSearch = styled.div`
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

const Show = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledTableHeader = styled.th`
  cursor: pointer;
  user-select: none;
  text-align: left;
  text-align: center;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  background-color: #efefefff;
  font-weight: 600;
  color: #374151;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e2e2e2ff;
  }

  &:first-child {
    border-top-left-radius: 0.75rem;
  }

  &:last-child {
    border-top-right-radius: 0.75rem;
  }
`;

const HeaderContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const SortIndicator = styled.span`
  opacity: 0.5;
  font-size: 1.1em;
  color: #6b7280;
  transition: all 0.2s ease;
`;

const StyledTableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #1f2937;

  tr:hover & {
    background-color: #f6f6f6;
  }

  tr:last-child & {
    border-bottom: none;
  }
`;

const EmptyCell = styled.td`
  padding: 32px 12px;
  text-align: center;
  color: #6b7280;
`;