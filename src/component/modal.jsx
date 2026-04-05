import {
    useState,
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import * as bootstrap from "bootstrap";

const Modal = forwardRef(
    (
        { modalType, modalMap, closeModal, productForm, onSubmit, onUpload },
        ref,
    ) => {
        const [tempData, setTempData] = useState(productForm);
        const [uploadDisabled, setUploadDisabled] = useState(false);

        const initContentFields = {
            origin: "",
            roast: "",
            process: "",
            altitude: "",
            harvest: "",
            sca: "",
            flavors: "",
            rating: "",
            ratingCount: "",
        };
        const [contentFields, setContentFields] = useState(initContentFields);
        const lastInputRef = useRef(null);
        const modalDomRef = useRef(null);
        const bsModalRef = useRef(null);

        useEffect(() => {
            bsModalRef.current = new bootstrap.Modal(modalDomRef.current, {
                keyboard: true,
            });
            const handleHide = () => {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            };
            modalDomRef.current.addEventListener("hide.bs.modal", handleHide);
            return () => {
                modalDomRef.current?.removeEventListener(
                    "hide.bs.modal",
                    handleHide,
                );
                bsModalRef.current?.dispose();
            };
        }, []);

        useImperativeHandle(ref, () => ({
            show: () => bsModalRef.current?.show(),
            hide: () => bsModalRef.current?.hide(),
        }));

        useEffect(() => {
            setTempData(productForm);
            try {
                const parsed = JSON.parse(productForm.content);
                setContentFields({
                    origin: parsed.origin || "",
                    roast: parsed.roast || "",
                    process: parsed.process || "",
                    altitude: parsed.altitude || "",
                    harvest: parsed.harvest || "",
                    sca: parsed.sca || "",
                    flavors: Array.isArray(parsed.flavors) ? parsed.flavors.join("、") : "",
                    rating: parsed.rating ?? "",
                    ratingCount: parsed.ratingCount ?? "",
                });
            } catch {
                setContentFields(initContentFields);
            }
        }, [productForm]);

        const modalInputChange = (e) => {
            const { name, value, type, checked } = e.target;
            setTempData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
            }));
        };

        const contentFieldChange = (e) => {
            const { name, value } = e.target;
            if (name === "rating" && !/^[1-5]?$/.test(value)) return;
            const updated = { ...contentFields, [name]: value };
            setContentFields(updated);
            const json = JSON.stringify({
                origin: updated.origin,
                roast: updated.roast,
                process: updated.process,
                altitude: updated.altitude,
                harvest: updated.harvest,
                sca: updated.sca,
                flavors: updated.flavors.split("、").map((s) => s.trim()).filter(Boolean),
                rating: Number(updated.rating) || 0,
                ratingCount: Number(updated.ratingCount) || 0,
            });
            setTempData((prev) => ({ ...prev, content: json }));
        };

        const addImage = () => {
            setTempData((prev) => ({
                ...prev,
                imagesUrl: [...prev.imagesUrl, ""],
            }));
        };

        const removeImage = () => {
            setTempData((prev) => {
                const newImages = [...prev.imagesUrl];
                newImages.pop();
                return { ...prev, imagesUrl: newImages };
            });
        };

        const doImageChange = (index, url) => {
            setTempData((prev) => {
                const newImages = [...prev.imagesUrl];
                newImages[index] = url;
                if (
                    url !== "" &&
                    index === newImages.length - 1 &&
                    newImages.length < 5
                ) {
                    newImages.push("");
                }
                if (
                    newImages.length > 1 &&
                    newImages[newImages.length - 1] === ""
                ) {
                    newImages.pop();
                }
                return { ...prev, imagesUrl: newImages };
            });
        };

        const uploadFile = async (e) => {
            e.preventDefault();
            const file = e.target.files?.[0];
            if (!file) return;
            const imageUrl = await onUpload(file);
            if (imageUrl) {
                setTempData((prev) => ({ ...prev, imageUrl }));
            }
            e.target.value = null;
        };

        useEffect(() => {
            if (lastInputRef.current) {
                lastInputRef.current.focus();
            }
            setUploadDisabled(tempData.imagesUrl.length === 5);
        }, [tempData.imagesUrl.length]);

        const submitModal = async () => {
            await onSubmit(modalType, tempData);
        };

        return (
            <div
                id="productModal"
                className="modal fade"
                tabIndex="-1"
                aria-labelledby="productModalLabel"
                aria-hidden="true"
                ref={modalDomRef}
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content border-0">
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
                                        刪除產品{" "}
                                        <span className="text-danger">
                                            {tempData.title || "沒選到"}
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
                                                    disabled={uploadDisabled}
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
                                                value={tempData.imageUrl}
                                                onChange={modalInputChange}
                                            />
                                        </div>
                                        {tempData.imageUrl && (
                                            <img
                                                className="img-fluid"
                                                src={tempData.imageUrl}
                                                alt="主圖"
                                            />
                                        )}
                                        <div>
                                            {tempData.imagesUrl.length}張圖
                                            <ul>
                                                {tempData.imagesUrl.map(
                                                    (url, index) => (
                                                        <li
                                                            key={index}
                                                            className="img-thumbnail"
                                                        >
                                                            <input
                                                                type="text"
                                                                className="form-control mb-1"
                                                                placeholder={`圖片網址 ${index + 1}`}
                                                                value={url}
                                                                onChange={(e) =>
                                                                    doImageChange(
                                                                        index,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                ref={
                                                                    index ===
                                                                        tempData
                                                                            .imagesUrl
                                                                            .length -
                                                                            1 &&
                                                                    tempData
                                                                        .imagesUrl[
                                                                        tempData
                                                                            .imagesUrl
                                                                            .length -
                                                                            1
                                                                    ] === ""
                                                                        ? lastInputRef
                                                                        : null
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
                                                <div className="d-flex justify-content-between">
                                                    {tempData.imagesUrl.length <
                                                        5 &&
                                                        tempData.imagesUrl[
                                                            tempData.imagesUrl
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
                                                    {tempData.imagesUrl
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
                                                value={tempData.title}
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
                                                    value={tempData.category}
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
                                                    value={tempData.unit}
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
                                                        tempData.origin_price
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
                                                    value={tempData.price}
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
                                                value={tempData.description}
                                                onChange={modalInputChange}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3 border rounded p-3">
                                            <label className="form-label d-block text-start fw-bold">
                                                產品詳細資訊
                                            </label>
                                            <div className="row g-2">
                                                <div className="col-md-6">
                                                    <label className="form-label small">產地</label>
                                                    <input
                                                        name="origin"
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：衣索比亞"
                                                        value={contentFields.origin}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">烘焙度</label>
                                                    <input
                                                        name="roast"
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：淺烘焙"
                                                        value={contentFields.roast}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">處理法</label>
                                                    <input
                                                        name="process"
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：水洗"
                                                        value={contentFields.process}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">海拔</label>
                                                    <input
                                                        name="altitude"
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：1,800 - 2,200 m"
                                                        value={contentFields.altitude}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">採收季</label>
                                                    <input
                                                        name="harvest"
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：11月 - 1月"
                                                        value={contentFields.harvest}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">SCA 評分</label>
                                                    <input
                                                        name="sca"
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：85+"
                                                        value={contentFields.sca}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label small">
                                                        風味特徵
                                                        <span className="text-muted ms-1">（以「、」分隔）</span>
                                                    </label>
                                                    <input
                                                        name="flavors"
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：茉莉花香、柑橘調性、蜂蜜甜感"
                                                        value={contentFields.flavors}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">星星評分（1–5）</label>
                                                    <input
                                                        name="rating"
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[1-5]"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：4"
                                                        value={contentFields.rating}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">評價則數</label>
                                                    <input
                                                        name="ratingCount"
                                                        type="number"
                                                        min="0"
                                                        className="form-control form-control-sm"
                                                        placeholder="例：12"
                                                        value={contentFields.ratingCount}
                                                        onChange={contentFieldChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check d-flex">
                                                <input
                                                    id="is_enabled"
                                                    name="is_enabled"
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={
                                                        tempData.is_enabled ===
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
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-5"
                                onClick={closeModal}
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                className={`btn ${
                                    modalType === "delete"
                                        ? "btn-danger"
                                        : "btn-primary"
                                } px-5`}
                                onClick={submitModal}
                            >
                                確認{modalType === "delete" ? "刪除" : ""}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);
export default Modal;
