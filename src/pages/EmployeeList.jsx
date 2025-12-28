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
            <PageNumberWrapper>
            {getSmartPages(currentPage, totalPages).map((item, i) => {
              const isNumber = typeof item === "number";
              const isActive = isNumber && item === currentPage;
              return (
                <PageNumber
                  key={`${item}-${i}`}
                  onClick={() => isNumber && setPage(item)}
                  $isActive={isActive}
                  $isClickable={isNumber}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item}
                </PageNumber>
              );
            })}
          </PageNumberWrapper>

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
  gap: 5px;
  flex-wrap: wrap;

  @media (min-width: 425px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }  
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

const PageNumberWrapper = styled.div `
    order: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;

    @media (min-width: 425px) {
      order: initial;
      width: auto;
    }  
`

const PageNumber = styled.span`
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  color: ${props => props.$isActive ? '#3b8e00' : '#ccc'};
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
  padding: 2px;
  user-select: none;
`;