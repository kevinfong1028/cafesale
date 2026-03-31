import { useState, useEffect, useRef } from "react";
import { adminProductApi } from "../apis";
import axios from "axios";
import TableAdmin from "../component/TableAdmin";
import Modal from "../component/Modal";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = "kevin-react";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const modalRef = useRef(null);
    const [modalType, setModalType] = useState("create");
    const modalMap = { create: "新增", edit: "編輯", delete: "刪除" };
    const initForm = {
        id: "",
        category: "",
        content: "",
        description: "",
        imageUrl: "",
        imagesUrl: [],
        is_enabled: 0,
        origin_price: 0,
        price: 0,
        title: "",
        unit: "",
    };

    const [productForm, setProductForm] = useState(initForm);

    const pagiObj = {
        total_pages: 2,
        current_page: 1,
        has_pre: false,
        has_next: true,
        category: "",
    };
    const [pagination, setPagination] = useState(pagiObj);

    const getProducts = async (pageNum) => {
        try {
            const response = await adminProductApi.getByPage({ page: pageNum ?? 1 });
            if (response.data.success) {
                setProducts(response.data.products);
                setPagination(response.data.pagination);
            }
        } catch (err) {
            console.error("Error fetching admin products:", err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const openModal = (product, type) => {
        setModalType(type);
        if (type === "create") {
            setProductForm(initForm);
        } else {
            setProductForm((prev) => ({ ...prev, imagesUrl: [], ...product }));
        }
        modalRef.current.show();
    };

    const closeModal = () => {
        setProductForm(initForm);
        modalRef.current.hide();
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("file-to-upload", file);
        try {
            const resp = await axios.post(
                `${apiBase}/api/${apiPath}/admin/upload`,
                formData,
            );
            if (resp.data.success) return resp.data.imageUrl;
        } catch (error) {
            console.error("upload error", error);
        }
        return null;
    };

    const handleSubmit = async (type, data) => {
        console.log('handleSubmit', type, data)
        if (type === "create") {
            const req = {
                // data: {
                    ...data,
                    origin_price: Number(data.origin_price),
                    price: Number(data.price),
                // },
            };
            // delete req.id
            // console.log(req)
            const res = await adminProductApi.add(req);
            if (res.data.success) {
                modalRef.current.hide();
                getProducts();
            }
        } else if (type === "edit") {
            const req = {
                ...data,
                origin_price: Number(data.origin_price),
                price: Number(data.price),
            };
            delete req.id;
            const res = await adminProductApi.edit(data.id, req);
            if (res.data.success) {
                modalRef.current.hide();
                getProducts();
            }
        } else if (type === "delete") {
            const res = await adminProductApi.delete(data.id);
            if (res.data.success) {
                modalRef.current.hide();
                getProducts();
            }
        }
    };

    return (
        <>
            <div className="container py-5">
                <div className="products-gridX">
                    <section className="table-section">
                        <h2>商品管理</h2>
                        <p className="table-description">
                            <button
                                type="button"
                                className="btn btn-primary ms-auto"
                                onClick={() => openModal({}, "create")}
                            >
                                新增
                            </button>
                        </p>
                        <TableAdmin
                            products={products}
                            pagination={pagination}
                            openModal={openModal}
                            getProducts={getProducts}
                        />
                    </section>
                </div>
            </div>
            <Modal
                ref={modalRef}
                productForm={productForm}
                modalType={modalType}
                modalMap={modalMap}
                closeModal={closeModal}
                onSubmit={handleSubmit}
                onUpload={handleUpload}
            />
        </>
    );
}
