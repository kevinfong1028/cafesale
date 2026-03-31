import { useSelector } from "react-redux";

export default function ToastContainer() {
    const messages = useSelector((state) => state.msg);

    return (
        <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1100 }}
        >
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`toast show align-items-center text-bg-${msg.type} border-0`}
                    role="alert"
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            <strong>{msg.title}：</strong>{msg.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
