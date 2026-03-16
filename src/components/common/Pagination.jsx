import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, ITEMS_PER_PAGE, itemList, setCurrentPage }) => {

    const totalPages = Math.ceil(itemList.length / ITEMS_PER_PAGE);
    return (
        <>
            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3 px-1">
                    <span className="text-muted small">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, itemList.length)} of {itemList.length} cafes
                    </span>
                    <Pagination className="mb-0" size="sm">
                        <Pagination.Prev
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        />
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item
                                key={i + 1}
                                active={currentPage === i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                style={currentPage === i + 1 ? { '--bs-pagination-active-bg': '#8B3A2A', '--bs-pagination-active-border-color': '#8B3A2A' } : {}}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            )}
        </>
    )
}

export default PaginationComponent
