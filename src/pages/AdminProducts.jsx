import { useState, useEffect, useRef } from "react";
import { adminProductApi } from "../apis";
import axios from "axios";
import TableAdmin from "../component/TableAdmin";
import Modal from "../component/Modal";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const modalRef = useRef(null); // 指向 <Modal /> 元件，呼叫 show/hide
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

    const modalInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const addImage = (e) => {
        console.log("addImage", productForm.imagesUrl);
        setProductForm((prev) => ({
            ...prev,
            imagesUrl: [...prev.imagesUrl, ""],
        }));
    };

    const removeImage = (e) => {
        console.log(
            "removeImage",
            productForm.imagesUrl,
            [...productForm.imagesUrl].pop(),
        );
        setProductForm((prev) => {
            // imagesUrl: prev.imagesUrl.pop(), // 動到原始陣列
            const copyImagesUrl = [...prev.imagesUrl];
            copyImagesUrl.pop();
            return {
                ...prev,
                imagesUrl: copyImagesUrl,
            };
        });
    };

    const doImageChange = (index, url) => {
        setProductForm((prev) => {
            const copyImagesUrl = [...prev.imagesUrl];
            copyImagesUrl[index] = url;
            // 有值、未滿5個、又是最後一個，就增一空位
            if (
                url !== "" &&
                index === copyImagesUrl.length - 1 &&
                copyImagesUrl.length < 5
            ) {
                copyImagesUrl.push("");
            }
            // 滿5個、清空input
            // if(url === ''){
            //     if(copyImagesUrl.length === 5){}
            // }
            return {
                ...prev,
                imagesUrl: copyImagesUrl,
            };
        });
    };

    const getProducts = async (pageNum) => {
        try {
            const response = await adminProductApi.getByPage({
                page: pageNum ?? 1,
            });
            console.log("products", response.data);
            if (response.data.success) {
                console.log("success");
                setProducts(response.data.products);
                setPagination(response.data.pagination);
                // return response.data;
            }
        } catch (err) {
            console.error("Error fetching admin products:", err);
        }
    };

    useEffect(() => {
        // setProducts(
        //     getProducts().products.length > 0 ? getProducts().products : [],
        // );
        getProducts();
        // getProducts()
        //     .then((res) => {
        //         setProducts(res.products);
        //     })
        //     .catch((err) => {
        //         console.error("Error in useEffect fetching products:", err);
        //     });

    }, []);

    const openModal = (product, type) => {
        setModalType(type);
        console.log("opemModal", type, product);
        // console.log("modal實體", modalRef.current, modalRef.current);
        if (type === "create") {
            setProductForm(initForm);
        } else {
            setProductForm((prev) => ({
                ...prev,
                imagesUrl: [],
                ...product,
            }));
        }

        modalRef.current.show();
    };

    const closeModal = () => {
        setProductForm(initForm);
        modalRef.current.hide();
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        const formData = new FormData();
        formData.append("file-to-upload", file);
        console.log("uploadFile", file, formData);

        try {
            const resp = await axios.post(
                `${apiBase}/api/${apiPath}/admin/upload`,
                formData,
            );
            console.log("resp", resp);
            if (resp.data.success) {
                setTempData((prev) => ({
                    ...prev,
                    imageUrl: resp.data.imageUrl,
                }));
                toasting("圖片上傳成功");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            e.target.value = null;
        }
    };

    const productModalRef = useRef(null);

    const submitModal = async () => {
        console.log("submit", modalType);
        // console.log("modal ref:", modalRef.current);

        // productModalRef.current = new bootstrap.Modal(modalRef.current);
        // console.log("modal ref 2:", productModalRef.current);
        // console.log("modal ref 2:", modalRef.current);

        if (modalType === "create") {
            console.log("create res", res);
        } else if (modalType === "edit") {
            // console.log("[EDIT] send", productForm.id, productForm);
            const req = {
                ...productForm,
                price: Number(productForm.price),
                origin_price: Number(productForm.origin_price),
            };
            delete req.id;
            // return;
            const res = await adminProductApi.edit(productForm.id, req);
            if (res.data.success) {
                modalRef.current.hide();
                getProducts();
            }
            console.log("[Edit] res", res);
        } else if (modalType === "delete") {
            try {
                const res = await adminProductApi.delete(productForm.id);
                console.log("delete res", res);
                modalRef.current.hide();
                getProducts();
            } catch (error) {}
        }
    };

    return (
        <>
            {/* <div>Admin Products</div> */}
            <div className="container py-5">

                {/* <!-- Products Grid --> */}
                <div className="products-gridX">
                    <section className="table-section">
                        <h2>商品管理</h2>
                        <p className="table-description">
                            這個表格展示了更多的產品資訊。同樣的響應式設計適用於任何列數的表格。
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
                        />
                    </section>
                </div>
            </div>
            <Modal ref={modalRef} productForm={productForm} modalType={modalType} modalMap={modalMap} adminProductApi={adminProductApi} closeModal={closeModal} />
            {/* <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                ref={modalRef}
            >
                <div
                    className={`modal-dialog modal-${modalType === "delete" ? "md" : "xl"}`}
                >
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 id="productModalLabel" className="modal-title">
                                <span>{`${modalMap[modalType]}產品`}</span>
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {modalType === "delete" ? (
                                <div className="row">
                                    <div className="col">
                                        刪除產品編號{" "}
                                        <span className="text-danger">
                                            {productForm.title
                                                ? productForm.title
                                                : "沒選到"}
                                        </span>
                                        嗎?
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="mb-3">
                                            <label htmlFor="file-to-upload">
                                                上傳主圖
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="file"
                                                    id="file-to-upload"
                                                    name="file-to-upload"
                                                    accept=".jpg,.jpeg,.png"
                                                    className="form-control"
                                                    disabled={false}
                                                    onChange={uploadFile}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="imageUrl"
                                                className="form-label"
                                            >
                                                輸入圖片網址
                                            </label>
                                            <input
                                                name="imageUrl"
                                                type="text"
                                                className="form-control"
                                                placeholder="請輸入圖片連結"
                                                value={productForm.imageUrl}
                                                onChange={modalInputChange}
                                            />
                                        </div>
                                        {productForm.imageUrl && (
                                            <img
                                                className="img-fluid"
                                                src={productForm.imageUrl}
                                                alt="主圖"
                                            />
                                        )}
                                        <div>
                                            {productForm.imagesUrl.length}
                                            張圖
                                            <ul>
                                                {productForm.imagesUrl.map(
                                                    (url, index) => (
                                                        <li
                                                            key={index}
                                                            className="img-thumbnail"
                                                        >
                                                            <input
                                                                type="text"
                                                                className="form-control mb-1"
                                                                placeholder={`圖片網址 ${
                                                                    index + 1
                                                                }`}
                                                                value={url}
                                                                onChange={(e) =>
                                                                    doImageChange(
                                                                        index,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                            {url && (
                                                                <img
                                                                    src={url}
                                                                    alt="副圖"
                                                                />
                                                            )}
                                                        </li>
                                                    ),
                                                )}
                                                <div className="d-flex.justify-content-between">
                                                    {productForm.imagesUrl
                                                        .length < 5 &&
                                                        productForm.imagesUrl[
                                                            productForm
                                                                .imagesUrl
                                                                .length - 1
                                                        ] !== "" && (
                                                            <button
                                                                className="btn btn-outline-primary btn-sm w-100 mx-1"
                                                                onClick={
                                                                    addImage
                                                                }
                                                            >
                                                                加一張圖片
                                                            </button>
                                                        )}
                                                    {productForm.imagesUrl
                                                        .length >= 1 && (
                                                        <button
                                                            className="btn btn-outline-danger btn-sm w-100 mx-1"
                                                            onClick={
                                                                removeImage
                                                            }
                                                        >
                                                            取消圖片
                                                        </button>
                                                    )}
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="title"
                                                className="form-label"
                                            >
                                                標題
                                            </label>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                className="form-control"
                                                placeholder="請輸入標題"
                                                value={productForm.title}
                                                onChange={modalInputChange}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="category"
                                                    className="form-label"
                                                >
                                                    分類
                                                </label>
                                                <input
                                                    id="category"
                                                    name="category"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="請輸入分類"
                                                    value={productForm.category}
                                                    onChange={modalInputChange}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="unit"
                                                    className="form-label"
                                                >
                                                    單位
                                                </label>
                                                <input
                                                    id="unit"
                                                    name="unit"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="請輸入單位"
                                                    value={productForm.unit}
                                                    onChange={modalInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="origin_price"
                                                    className="form-label"
                                                >
                                                    原價
                                                </label>
                                                <input
                                                    id="origin_price"
                                                    name="origin_price"
                                                    type="number"
                                                    min="0"
                                                    className="form-control"
                                                    placeholder="請輸入原價"
                                                    value={
                                                        productForm.origin_price
                                                    }
                                                    onChange={modalInputChange}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="price"
                                                    className="form-label"
                                                >
                                                    售價
                                                </label>
                                                <input
                                                    id="price"
                                                    name="price"
                                                    type="number"
                                                    min="0"
                                                    className="form-control"
                                                    placeholder="請輸入售價"
                                                    value={productForm.price}
                                                    onChange={modalInputChange}
                                                />
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="mb-3">
                                            <label
                                                htmlFor="description"
                                                className="form-label d-block text-start"
                                            >
                                                產品描述
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                className="form-control"
                                                placeholder="請輸入產品描述"
                                                value={productForm.description}
                                                onChange={modalInputChange}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="content"
                                                className="form-label d-block text-start"
                                            >
                                                說明內容
                                            </label>
                                            <textarea
                                                id="content"
                                                name="content"
                                                className="form-control"
                                                placeholder="請輸入說明內容"
                                                value={productForm.content}
                                                onChange={modalInputChange}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <div
                                                className="form-check d-flex
                                                        "
                                            >
                                                <input
                                                    id="is_enabled"
                                                    name="is_enabled"
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={
                                                        productForm.is_enabled ===
                                                        1
                                                    }
                                                    onChange={modalInputChange}
                                                />
                                                <label
                                                    className="form-check-label ms-3"
                                                    htmlFor="is_enabled"
                                                >
                                                    是否啟用
                                                </label>
                                            </div>
                                            <hr />
                                            {productForm.imagesUrl.map(
                                                (v, i) => (
                                                    <p key={v + i}>
                                                        {i + " 是 " + v}
                                                    </p>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            {modalType === "delete" ? (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={submitModal}
                                >
                                    Delete
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={submitModal}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
