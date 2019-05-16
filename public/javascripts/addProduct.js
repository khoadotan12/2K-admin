function formatPrice(price) = {
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log(formatted);
}