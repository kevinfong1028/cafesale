const useBsModal = () => {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            modalInstance.current = new bootstrap.Modal(modalRef.current);
        }
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
            if (modalInstance.current) {
                modalInstance.current?.dispose();
                modalInstance.current = null; // 確保不再使用已經 dispose 的實例
                console.log("modal 銷毀");
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
