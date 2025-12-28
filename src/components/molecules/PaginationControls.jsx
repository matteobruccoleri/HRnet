import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../atoms/Button";

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

function PaginationControls({
  currentPage,
  totalPages,
  total,
  startIndex,
  pageSize,
  onPageChange
}) {
  return (
    <PaginationWrapper>
      <EntriesInfo>
        {total === 0
          ? "Showing 0 to 0 of 0 entries"
          : `Showing ${startIndex + 1} to ${Math.min(
              startIndex + pageSize,
              total
            )} of ${total} entries`}
      </EntriesInfo>

      <PaginationNav>
        <Button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                onClick={() => isNumber && onPageChange(item)}
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
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </PaginationNav>
    </PaginationWrapper>
  );
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationControls;

// Styled components
const PaginationWrapper = styled.div`
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
`;

const EntriesInfo = styled.div`
  font-size: 14px;
  color: #555;
`;

const PaginationNav = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;

  @media (min-width: 425px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

const PageNumberWrapper = styled.div`
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
`;

const PageNumber = styled.span`
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  color: ${props => props.$isActive ? '#3b8e00' : '#ccc'};
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
  padding: 2px;
  user-select: none;
`;
