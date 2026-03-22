import Pagination from "./Pagination";

const TableAdmin = ({products, pagination, openModal} ) => {
    console.log("AAA", products);
    console.log("BBB", pagination);
    return (
        <div className="table-container">
            <div className="pagination-info">
                <span className="pagination-info-text">
                    顯示 <strong>1-10</strong> 筆，共 <strong>50</strong> 筆
                </span>
            </div>
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>id.</th>
                        <th>品項</th>
                        <th>烘焙度</th>
                        <th>售價</th>
                        <th>庫存</th>
                        <th>啟用</th>
                        <th
                            className="text-center"
                            style={{ minWidth: "160px" }}
                        >
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products ? (
                        products.map((product, index) => (
                            <tr key={product.id}>
                                <td data-label="編號">{index}</td>
                                <td data-label="品項">{product.title}</td>
                                <td data-label="種類">{product.category}</td>
                                <td data-label="售價" className="">
                                    {product.price}
                                </td>
                                <td data-label="庫存" className="">
                                    {product.num}
                                </td>
                                <td data-label="啟用" className="text-center">
                                    {product.is_enabled ? "是" : "否"}
                                </td>
                                <td data-label="操作" className="action-cell">
                                    <div className="action-buttons justify-content-center">
                                        <button
                                            className="btn-action btn-primary-action"
                                            onClick={() =>
                                                openModal(product, "edit")
                                            }
                                        >
                                            查看
                                        </button>
                                        <button
                                            className="btn-action btn-secondary-action"
                                            onClick={() =>
                                                openModal(product, "delete")
                                            }
                                        >
                                            移除
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" data-label="編號">
                                暫無產品
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination pagination={pagination}/>
        </div>
    );
};

export default TableAdmin;
