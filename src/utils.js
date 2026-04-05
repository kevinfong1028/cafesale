export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

export const renderStars = (rating = 0) =>
    "⭐".repeat(Math.min(Math.max(Math.round(rating), 1), 5));


export const noopLink = (e)=>{
    e.preventDefault();
}