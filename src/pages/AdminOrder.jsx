import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import { adminOrderApi } from "../apis";
import Pagination from "../component/Pagination";

export default function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    const modalRef = useRef(null);
    const bsModalRef = useRef(null);

    useEffect(() => {
        bsModalRef.current = new bootstrap.Modal(modalRef.current, {
            keyboard: true,
        });
        const handleHide = () => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        };
        modalRef.current.addEventListener("hide.bs.modal", handleHide);
        return () => {
            modalRef.current?.removeEventListener("hide.bs.modal", handleHide);
            bsModalRef.current?.dispose();
        };
    }, []);

    const getOrders = async (page = 1) => {
        try {
            setLoading(true);
            const res = await adminOrderApi.get({ page });
            if (res.data.success) {
                setOrders(res.data.orders);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const openModal = (order) => {
        setSelectedOrder(order);
        bsModalRef.current?.show();
    };

    const closeModal = () => {
        bsModalRef.current?.hide();
    };

    const togglePaid = async () => {
        if (!selectedOrder) return;
        try {
            setModalLoading(true);
            const res = await adminOrderApi.edit(selectedOrder.id, {
                ...selectedOrder,
                is_paid: !selectedOrder.is_paid,
            });
            if (res.data.success) {
                const updated = {
                    ...selectedOrder,
                    is_paid: !selectedOrder.is_paid,
                };
                setSelectedOrder(updated);
                setOrders((prev) =>
                    prev.map((o) => (o.id === updated.id ? updated : o)),
                );
            }
        } catch (err) {
            console.error("Error updating order:", err);
        } finally {
            setModalLoading(false);
        }
    };

    const deleteOrder = async (id) => {
        if (!window.confirm("確定要刪除此訂單？")) return;
        try {
            await adminOrderApi.delete(id);
            getOrders(pagination.current_page || 1);
        } catch (err) {
            console.error("Error deleting order:", err);
        }
    };

    const formatDate = (timestamp) =>
        new Date(timestamp * 1000).toLocaleDateString("zh-TW");

    return (
        <div className="container-fluid py-4">
            <h1 className="h4 fw-bold mb-4">訂單管理</h1>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" />
                </div>
            ) : (
                <>
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>訂單編號</th>
                                            <th>建立時間</th>
                                            <th>訂購人</th>
                                            <th>金額</th>
                                            <th>付款狀態</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="text-center py-5 text-muted"
                                                >
                                                    目前沒有訂單
                                                </td>
                                            </tr>
                                        ) : (
                                            orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td className="align-middle">
                                                        <span className="text-muted small font-monospace">
                                                            {order.id.slice(0, 10)}…
                                                        </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        {formatDate(order.create_at)}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.user?.name || "—"}
                                                    </td>
                                                    <td className="align-middle">
                                                        NT$ {order.total}
                                                    </td>
                                                    <td className="align-middle">
                                                        <span
                                                            className={`badge ${order.is_paid ? "bg-success" : "bg-warning text-dark"}`}
                                                        >
                                                            {order.is_paid
                                                                ? "已付款"
                                                                : "待處理"}
                                                        </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm me-2"
                                                            onClick={() =>
                                                                openModal(order)
                                                            }
                                                        >
                                                            詳情
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                deleteOrder(order.id)
                                                            }
                                                        >
                                                            刪除
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            pagination={pagination}
                            getProducts={getOrders}
                        />
                    </div>
                </>
            )}

            {/* Order Detail Modal */}
            <div className="modal fade" tabIndex={-1} ref={modalRef}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content border-0">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">訂單詳情</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={closeModal}
                            />
                        </div>

                        {selectedOrder && (
                            <div className="modal-body">
                                <div className="row g-4 mb-4">
                                    {/* Customer Info */}
                                    <div className="col-md-6">
                                        <h6 className="fw-bold border-bottom pb-2 mb-3">
                                            訂購人資訊
                                        </h6>
                                        <p className="mb-1">
                                            <span className="text-muted me-2">
                                                姓名
                                            </span>
                                            {selectedOrder.user?.name}
                                        </p>
                                        <p className="mb-1">
                                            <span className="text-muted me-2">
                                                Email
                                            </span>
                                            {selectedOrder.user?.email}
                                        </p>
                                        <p className="mb-1">
                                            <span className="text-muted me-2">
                                                電話
                                            </span>
                                            {selectedOrder.user?.tel}
                                        </p>
                                        <p className="mb-1">
                                            <span className="text-muted me-2">
                                                地址
                                            </span>
                                            {selectedOrder.user?.address}
                                        </p>
                                        {selectedOrder.message && (
                                            <p className="mb-1">
                                                <span className="text-muted me-2">
                                                    備註
                                                </span>
                                                {selectedOrder.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Order Status */}
                                    <div className="col-md-6">
                                        <h6 className="fw-bold border-bottom pb-2 mb-3">
                                            付款狀態
                                        </h6>
                                        <span
                                            className={`badge mb-3 ${selectedOrder.is_paid ? "bg-success" : "bg-warning text-dark"}`}
                                        >
                                            {selectedOrder.is_paid
                                                ? "已付款"
                                                : "待處理"}
                                        </span>
                                        <div>
                                            <button
                                                className={`btn btn-sm ${selectedOrder.is_paid ? "btn-outline-warning" : "btn-outline-success"}`}
                                                onClick={togglePaid}
                                                disabled={modalLoading}
                                            >
                                                {selectedOrder.is_paid
                                                    ? "標記為待處理"
                                                    : "標記為已付款"}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Products */}
                                <h6 className="fw-bold border-bottom pb-2 mb-3">
                                    訂購商品
                                </h6>
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>商品名稱</th>
                                            <th>數量</th>
                                            <th>單價</th>
                                            <th className="text-end">小計</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(
                                            selectedOrder.products || {},
                                        ).map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.product?.title}</td>
                                                <td>{item.qty}</td>
                                                <td>
                                                    NT$ {item.product?.price}
                                                </td>
                                                <td className="text-end">
                                                    NT${" "}
                                                    {item.final_total ||
                                                        item.total}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="fw-bold">
                                            <td colSpan={3} className="text-end">
                                                總計
                                            </td>
                                            <td className="text-end">
                                                NT$ {selectedOrder.total}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={closeModal}
                            >
                                關閉
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
