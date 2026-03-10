import { useState, useEffect, useRef } from "react";
import { adminProductApi } from "../apis";
import * as bootstrap from "bootstrap";
import { set } from "react-hook-form";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    const getProducts = async () => {
        try {
            const response = await adminProductApi.getByPage();
            console.log("products", response.data);
            if (response.data.success) {
                return response.data;
            }
        } catch (err) {
            console.error("Error fetching admin products:", err);
        }
    };

    useEffect(() => {
        // setProducts(
        //     getProducts().products.length > 0 ? getProducts().products : [],
        // );
        getProducts()
            .then((res) => {
                console.log("get products", res);
                setProducts(res.products);
            })
            .catch((err) => {
                console.error("Error in useEffect fetching products:", err);
            });

        // const bsModal = new bootstrap.Modal(
        //     document.getElementById("bs-modal"),
        // );

        modalInstance.current = new bootstrap.Modal(modalRef.current, {
            keyboard: false,
        });
        const handleBSHideIssue = () => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        };

        console.log("Modal 初始化:", modalInstance.current);
        modalRef.current.addEventListener("hide.bs.modal", handleBSHideIssue);

        return () => {
            modalRef.current.removeEventListener(
                "hide.bs.modal",
                handleBSHideIssue,
            );
            modalInstance.current.dispose();
        };
    }, []);

    const openModal = () => {
        modalInstance.current.show();
    };

    const closeModal = () => {
        modalInstance.current.hide();
    };

    

    return (
        <>
            <div>Admin Products</div>
            <section
                style={{
                    background:
                        "linear-gradient(135deg, rgba(93, 112, 82, 0.1) 0%, rgba(193, 140, 93, 0.05) 100%)",
                    padding: "2.5rem 0",
                }}
            >
                <div className="container">
                    <h1 className="h2 fw-bold mb-2">精品咖啡豆</h1>
                    <p className="text-muted">
                        精選來自全球各地的單品咖啡豆，每一款都有其獨特的風土故事。
                    </p>
                </div>
            </section>

            {/* <!-- Main Content --> */}
            <div className="container py-5">
                {/* <!-- Filter Section --> */}

                <p className="text-muted small mb-4">共 6 款產品</p>

                {/* <!-- Products Grid --> */}
                <div className="products-gridX">
                    <section className="table-section">
                        <h2>擴展表格範例</h2>
                        <p className="table-description">
                            這個表格展示了更多的產品資訊。同樣的響應式設計適用於任何列數的表格。
                            <button
                                type="button"
                                className="btn btn-primary ms-auto"
                                onClick={openModal}
                            >
                                新增
                            </button>
                        </p>

                        <div className="table-container">
                            <div className="pagination-info">
                                <span className="pagination-info-text">
                                    顯示 <strong>1-10</strong> 筆，共{" "}
                                    <strong>50</strong> 筆
                                </span>
                            </div>
                            <table className="responsive-table">
                                <thead>
                                    <tr>
                                        <th>id.</th>
                                        <th>品項</th>
                                        <th>種類</th>
                                        <th>售價</th>
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
                                        products.map((product) => (
                                            <tr key={product.id}>
                                                <td data-label="編號">9785</td>
                                                <td data-label="品項">
                                                    {product.title}
                                                </td>
                                                <td data-label="種類">
                                                    {product.category}
                                                </td>
                                                <td
                                                    data-label="售價"
                                                    className="text-centerX"
                                                >
                                                    {product.price}
                                                </td>
                                                <td
                                                    data-label="啟用"
                                                    className="text-center"
                                                >
                                                    {product.is_enabled
                                                        ? "是"
                                                        : "否"}
                                                </td>
                                                <td
                                                    data-label="操作"
                                                    className="action-cell"
                                                >
                                                    <div className="action-buttons justify-content-center">
                                                        <button className="btn-action btn-primary-action">
                                                            查看
                                                        </button>
                                                        <button className="btn-action btn-secondary-action">
                                                            移除
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" data-label="編號">
                                                暫無產品
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <ul className="pagination">
                                <li className="pagination-item">
                                    <a
                                        href="javascript:void(0)"
                                        className="pagination-link prev"
                                    >
                                        ← 上一頁
                                    </a>
                                </li>
                                <li className="pagination-item">
                                    <a
                                        href="javascript:void(0)"
                                        className="pagination-link active"
                                    >
                                        1
                                    </a>
                                </li>
                                <li className="pagination-item">
                                    <a
                                        href="javascript:void(0)"
                                        className="pagination-link"
                                    >
                                        2
                                    </a>
                                </li>
                                <li className="pagination-item">
                                    <a
                                        href="javascript:void(0)"
                                        className="pagination-link next"
                                    >
                                        下一頁 →
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                ref={modalRef}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
