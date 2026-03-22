const Pagination = ({pagination, getProducts}) => {
    return (
        <ul className="pagination">
            {pagination.has_pre && (
                <li className="pagination-item">
                    <button
                        type="button"
                        href="javascript:void(0)"
                        className="pagination-link prev"
                        onClick={(e) =>
                            getProducts(pagination.current_page - 1)
                        }
                    >
                        ← 上一頁
                    </button>
                </li>
            )}
            {Array.from({ length: pagination.total_pages }, (_, i) => i).map(
                (p) => (
                    <li className="pagination-item" key={p + "-page"}>
                        <button
                            type="button"
                            href="javascript:void(0)"
                            className={`pagination-link ${pagination.current_page === p + 1 && "active"}`}
                            onClick={(e) => getProducts(p + 1)}
                        >
                            {p + 1}
                        </button>
                    </li>
                ),
            )}
            {pagination.has_next && (
                <li className="pagination-item">
                    <button
                        type="button"
                        href="javascript:void(0)"
                        className="pagination-link next"
                        onClick={(e) =>
                            getProducts(pagination.current_page + 1)
                        }
                    >
                        下一頁 →
                    </button>
                </li>
            )}
        </ul>
    );
};


export default Pagination;