import { useState } from "react";
import { useForm } from "react-hook-form";
import { noopLink } from "../utils";
import useMsg from "../hooks/useMsg";

const FAQ_LIST = [
    {
        q: "我如何購買咖啡豆？",
        a: "進入「產品」頁面後，點選您感興趣的咖啡豆，確認風味、克重後加入購物車。結帳時填寫收件資訊，選擇付款方式（信用卡、ATM 轉帳或超商代碼），送出訂單後您會收到確認 Email。",
    },
    {
        q: "運送需要多長時間？",
        a: "訂單成立後，我們通常於 1 個工作天內出貨。台灣本島配送約 2–3 個工作天送達，澎湖、金門、馬祖等離島地區約 5–7 個工作天。出貨後將以 Email 通知您貨運追蹤號碼。",
    },
    {
        q: "咖啡豆的保存方式？",
        a: "建議存放於密封容器中，置於陰涼、乾燥、避光處，勿放冰箱以免受潮。未開封真空包裝保存期限為 12 個月；開封後請於 2–4 週內飲用完畢，以確保最佳風味與新鮮度。",
    },
    {
        q: "可以退貨或換貨嗎？",
        a: "若收到商品有瑕疵或與描述不符，請於到貨 7 天內拍照聯絡客服，我們將安排免費換貨或全額退款。因個人風味偏好不符而退貨，需於未開封狀態下申請，運費由買方自行負擔。",
    },
    {
        q: "是否提供企業或團購優惠？",
        a: "是的，單次訂購 5 kg 以上即可享有 9 折優惠，10 kg 以上另有專屬報價。企業長期合作方案亦提供客製化烘焙與專屬包裝服務。歡迎來信 business@beanbrew.com 洽詢。",
    },
    {
        q: "咖啡豆可以客製化烘焙嗎？",
        a: "可以！我們提供淺、中、深三種烘焙度，以及水洗、日曬、蜜處理等不同處理法的客製選項。最低起訂量為 500g，下單時請在備註欄填寫需求，或直接聯絡我們的烘焙師討論。",
    },
];

export default function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { showSuccess } = useMsg();
    const [openFaq, setOpenFaq] = useState(null);

    const onSubmit = (data) => {
        console.log("contact form:", data);
        // 無API，模擬一下
        showSuccess("送出成功");
        setTimeout(() => reset(), 1500);
    };

    const toggleFaq = (index) => {
        setOpenFaq((prev) => (prev === index ? null : index));
    };

    return (
        <>
            {/* Hero */}
            <div className="contact-hero">
                <div className="container">
                    <h1>聯絡我們</h1>
                    <p>
                        有任何問題或建議嗎？我們很樂意聽取您的意見。請填寫下方表單或直接聯絡我們。
                    </p>
                </div>
            </div>

            <main className="container">
                <div className="contact-container">
                    {/* 聯絡表單 */}
                    <div className="contact-form">
                        <h2>傳送電子郵件</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">姓名 *</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    id="name"
                                    placeholder="請輸入您的姓名"
                                    {...register("name", { required: "請填寫姓名" })}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">電子郵件 *</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    id="email"
                                    placeholder="請輸入您的電子郵件"
                                    {...register("email", {
                                        required: "請填寫電子郵件",
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "電子郵件格式不正確" },
                                    })}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">電話</label>
                                <input
                                    type="tel"
                                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                    id="phone"
                                    placeholder="請輸入您的電話號碼"
                                    {...register("phone", {
                                        pattern: { value: /^[0-9()\-\s+]{7,15}$/, message: "電話號碼格式不正確" },
                                    })}
                                />
                                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">主旨 *</label>
                                <select
                                    className={`form-select ${errors.subject ? "is-invalid" : ""}`}
                                    id="subject"
                                    {...register("subject", { required: "請選擇主旨" })}
                                >
                                    <option value="">請選擇主旨</option>
                                    <option value="product">產品相關</option>
                                    <option value="order">訂單相關</option>
                                    <option value="feedback">意見回饋</option>
                                    <option value="partnership">合作洽詢</option>
                                    <option value="other">其他</option>
                                </select>
                                {errors.subject && <div className="invalid-feedback">{errors.subject.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">訊息 *</label>
                                <textarea
                                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                    id="message"
                                    placeholder="請輸入您的訊息"
                                    {...register("message", {
                                        required: "請填寫訊息內容",
                                        minLength: { value: 10, message: "訊息至少需要 10 個字" },
                                    })}
                                />
                                {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
                            </div>
                            <button type="submit" className="submit-btn">
                                寄送
                            </button>
                        </form>
                    </div>

                    {/* 聯絡資訊 */}
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-card-icon">📍</div>
                            <h3>地址</h3>
                            <p>
                                台北市中山區南京東路三段 100 號<br />
                                台灣
                            </p>
                        </div>
                        <div className="info-card">
                            <div className="info-card-icon">📞</div>
                            <h3>電話</h3>
                            <p>
                                <a href="tel:+886212345678">(02) 1234-5678</a>
                                <br />
                                <span
                                    style={{
                                        color: "#999",
                                        fontSize: "0.8125rem",
                                    }}
                                >
                                    週一至週五 09:00-18:00
                                </span>
                            </p>
                        </div>
                        <div className="info-card">
                            <div className="info-card-icon">📧</div>
                            <h3>電子郵件</h3>
                            <p>
                                <a href="mailto:info@beanbrew.com">
                                    info@beanbrew.com
                                </a>
                                <br />
                                <a href="mailto:support@beanbrew.com">
                                    support@beanbrew.com
                                </a>
                            </p>
                        </div>
                        <div className="info-card">
                            <div className="info-card-icon">🕐</div>
                            <h3>營業時間</h3>
                            <ul className="hours-list">
                                <li>
                                    <strong>週一至週五：</strong> 09:00 - 18:00
                                </li>
                                <li>
                                    <strong>週六：</strong> 10:00 - 16:00
                                </li>
                                <li>
                                    <strong>週日：</strong> 休息
                                </li>
                            </ul>
                        </div>
                        <div className="info-card">
                            <div className="info-card-icon">💬</div>
                            <h3>追蹤我們</h3>
                            <p>在社群媒體上與我們互動，獲取最新資訊和優惠。</p>
                            <div className="social-links">
                                <a href="#" onClick={noopLink} title="Facebook">
                                    f
                                </a>
                                <a
                                    href="#"
                                    onClick={noopLink}
                                    title="Instagram"
                                >
                                    📷
                                </a>
                                <a href="#" onClick={noopLink} title="Twitter">
                                    𝕏
                                </a>
                                <a href="#" onClick={noopLink} title="Line">
                                    💬
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <section className="faq-section">
                    <h2>常見問題</h2>
                    {FAQ_LIST.map(({ q, a }, index) => (
                        <div className="faq-item" key={index}>
                            <div
                                className="faq-question"
                                onClick={() => toggleFaq(index)}
                            >
                                <span>{q}</span>
                                <span className="faq-toggle">
                                    {openFaq === index ? "▲" : "▼"}
                                </span>
                            </div>
                            {
                                <div
                                    className={`faq-answer xxxx ${openFaq === index && "show"}`}
                                >
                                    {a}
                                </div>
                            }
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
}
