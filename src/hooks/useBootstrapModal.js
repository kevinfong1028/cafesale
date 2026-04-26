import { useRef, useEffect } from "react";
import * as bootstrap from "bootstrap";

const useBsModal = () => {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        const modalEl = modalRef.current;
        if (modalEl) {
            modalInstance.current = new bootstrap.Modal(modalEl);
        }
        const handleBSHideIssue = () => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        };
        modalEl.addEventListener("hide.bs.modal", handleBSHideIssue);

        return () => {
            modalEl.removeEventListener("hide.bs.modal", handleBSHideIssue);
            if (modalInstance.current) {
                modalInstance.current.dispose();
                modalInstance.current = null;
            }
        };
    }, []);

    const showModal = () => {
        modalInstance.current?.show();
    };

    const hideModal = () => {
        modalInstance.current?.hide();
    };

    return { modalRef, showModal, hideModal };
};

export default useBsModal;
