const LOCALSTORAGE_NAME = "rss-ecommerce";

const PRODUCTS_ON_PAGE = 20;

const SORT_OPTIONS = [
    { value: "default", label: "Default sort", ctSort: "" },
    { value: "priceAsc", label: "Ascending price", ctSort: "price asc" },
    { value: "priceDesc", label: "Descending price", ctSort: "price desc" },
    { value: "nameAsc", label: "By Name (A-Z)", ctSort: "name.com asc" },
    { value: "nameDesc", label: "By Name (Z-A)", ctSort: "name.com desc" }
];

const BRANDS = [
    "Samsung",
    "Apple",
    "Bosch",
    "Panasonic",
    "Lenovo"
];

const COLORS: Record<string, string> = {
    black: "Black",
    white: "White",
    blue: "Blue"
};

const COUNTRIES = [
    {
        title: "Germany (DE)",
        code: "DE"
    },
    {
        title: "United Kingdom (GB)",
        code: "GB"
    },
    {
        title: "United States (US)",
        code: "US"
    }
];

const MAX_PRICE_FILTER = 100000;

export {
    LOCALSTORAGE_NAME,
    PRODUCTS_ON_PAGE,
    SORT_OPTIONS,
    BRANDS,
    COLORS,
    MAX_PRICE_FILTER,
    COUNTRIES
};
