import styled from "styled-components";
import PropTypes from "prop-types";

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

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
        Showing {total === 0 ? 0 : startIndex + 1} to {total === 0 ? 0 : Math.min(startIndex + pageSize, total)} of {total} entries
      </EntriesInfo>

      <PaginationNav>
        <PaginationButton
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon />
        </PaginationButton>

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

        <PaginationButton
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon />
        </PaginationButton>
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
    gap: 25px;
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
  justify-content: center;

  @media (min-width: 425px) {
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
  padding: 2px;
  user-select: none;
  font-weight: ${({ $isActive }) => $isActive ? 'bold' : 'normal'};
  color: ${({ $isActive }) => $isActive ? '#3b8e00' : '#ccc'};
  cursor: ${({ $isClickable }) => $isClickable ? 'pointer' : 'default'};
`;

const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 0.4rem;
  border: 1px solid #e0e0e0;
  background: #f5f5f5;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #e8e8e8;
    border-color: #d0d0d0;
  }

  &:disabled {
    background: #fafafa;
    color: #ccc;
    border-color: #f0f0f0;
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    display: block;
  }
`;
