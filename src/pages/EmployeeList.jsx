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

function EmployeeList() {
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
    <StyledEmployeeList>
      <Title>Current Employees</Title>
        <Search
          value={search}
          placeholder="Search employees…"
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

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


      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        startIndex={startIndex}
        pageSize={pageSize}
        onPageChange={setPage}
      />
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
  border: 1px solid #e9e9e9;
  border-radius: 1rem;
  padding: 10px;
  width: 1280px;
  background-color: #ffffff;
  width: 1280px;

  @media (min-width: 1280px) {
    width: 100%;
  }
`;

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
`;

const StyledTableHeader = styled.th`
  cursor: pointer;
  user-select: none;
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const HeaderContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const SortIndicator = styled.span`
  opacity: 0.6;
`;

const StyledTableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

const EmptyCell = styled.td`
  padding: 12px;
  text-align: center;
`;