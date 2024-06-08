<script lang="ts">
    import { defineComponent } from "vue";
    import { getProducts } from "@/services/commercetoolsApi";
    import type { ProductAllData, ProductApiResponse, SelectOption } from "@/types";

    export default defineComponent({
        name: "ProductsView",
        data() {
            return {
                products: [] as ProductAllData[],
                isLoading: false,
                errorMessage: null as string | null,
                filters: {
                    minPrice: null as number | null,
                    maxPrice: null as number | null,
                    brand: null as string | null,
                    color: null as string | null,
                    size: null as string | null,
                    sortBy: "price_desc"
                },
                searchQuery: "",
                brands: [] as string[],
                colors: [] as string[],
                sizes: [] as string[],
                sortOptions: [
                    { title: "Price - Low to High", value: "price_asc" },
                    { title: "Price - High to Low", value: "price_desc" },
                    { title: "Name - A to Z", value: "name_asc" },
                    { title: "Name - Z to A", value: "name_desc" }
                ] as SelectOption[],
                sortedProducts: [] as ProductAllData[]
            };
        },
        async mounted() {
            this.isLoading = true;

            try {
                const response: ProductApiResponse = await getProducts();
                this.products = response.results;

                const brandSet = new Set<string>();
                const colorSet = new Set<string>();
                const sizeSet = new Set<string>();

                this.products.forEach((product) => {
                    const brand = product.masterVariant.attributes.find(
                        (attr) => attr.name === "brand"
                    )?.value.key;

                    const color = product.masterVariant.attributes.find(
                        (attr) => attr.name === "color"
                    )?.value.key;

                    const size = product.masterVariant.attributes.find(
                        (attr) => attr.name === "size"
                    )?.value.key;

                    if (brand) {
                        brandSet.add(brand);
                    }
                    if (color) {
                        colorSet.add(color);
                    }
                    if (size) {
                        sizeSet.add(size);
                    }
                });

                this.brands = Array.from(brandSet);
                this.colors = Array.from(colorSet);
                this.sizes = Array.from(sizeSet);
            } catch (err) {
                this.errorMessage = "Failed to fetch products";
            } finally {
                this.isLoading = false;
            }
        },
        computed: {
            filteredProducts(): ProductAllData[] {
                const { minPrice, maxPrice, brand, color, size, sortBy } = this.filters;

                return this.products
                    .filter((product) => {
                        const price = product.masterVariant.prices[0].value.centAmount;

                        const productBrand = product.masterVariant.attributes.find(
                            (attr) => attr.name === "brand"
                        )?.value.key;

                        const productColor = product.masterVariant.attributes.find(
                            (attr) => attr.name === "color"
                        )?.value.key;

                        const productSize = product.masterVariant.attributes.find(
                            (attr) => attr.name === "size"
                        )?.value.key;

                        const matchesSearchQuery = product.description?.["en-GB"]
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase());

                        return (
                            (!minPrice || price >= minPrice * 100) &&
                            (!maxPrice || price <= maxPrice * 100) &&
                            (!brand || productBrand === brand) &&
                            (!color || productColor === color) &&
                            (!size || productSize === size) &&
                            matchesSearchQuery
                        );
                    })
                    .sort((a, b) => {
                        const priceA = a.masterVariant.prices[0].value.centAmount;
                        const priceB = b.masterVariant.prices[0].value.centAmount;
                        const nameA = a.name && a.name["en-GB"] ? a.name["en-GB"].toLowerCase() : "";
                        const nameB = b.name && b.name["en-GB"] ? b.name["en-GB"].toLowerCase() : "";

                        switch (sortBy) {
                            case "price_asc":
                                return priceA - priceB;
                            case "price_desc":
                                return priceB - priceA;
                            case "name_asc":
                                return nameA.localeCompare(nameB);
                            case "name_desc":
                                return nameB.localeCompare(nameA);
                            default:
                                return 0;
                        }
                    });
            }
        },
        methods: {
            formatPrice(amount: number): string {
                return (amount / 100).toFixed(2);
            },
            goToDetailedProduct(productId: string) {
                this.$router.push({ name: "detailed", params: { id: productId } });
            },
            async applyFilters() {
                this.isLoading = true;

                try {
                    const response: ProductApiResponse = await getProducts();
                    this.products = response.results;
                } catch (err) {
                    this.errorMessage = "Failed to fetch products";
                } finally {
                    this.isLoading = false;
                }
            },
            resetFilters() {
                this.filters = {
                    minPrice: null,
                    maxPrice: null,
                    brand: null,
                    color: null,
                    size: null,
                    sortBy: "price_desc"
                };

                this.applyFilters();

                this.searchQuery = "";
            },
            clearFilters() {
                this.filters.sortBy = "price_desc";
                this.applyFilters();
            },
            getProductColors(product: ProductAllData): string[] {
                const colors = product.masterVariant.attributes
                    .filter((attr) => attr.name === "color")
                    .map((attr) => attr.value.key);

                return colors;
            }
        }
    });
</script>

<template>
    <v-container class="catalog-container" fluid>
        <v-row>
            <v-col cols="12">
                <h1 class="text-center">Product Catalog</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="3">
                <v-card class="filter-card">
                    <v-card-title>Search</v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="searchQuery"
                            label="Search Products"
                            prepend-icon="mdi-magnify"
                            @change="applyFilters"
                            @click:clear="resetFilters"
                            clearable
                        ></v-text-field>
                        <span v-if="filteredProducts.length">
                            {{ filteredProducts.length }} Products Found
                        </span>
                    </v-card-text>
                </v-card>
                <v-card class="filter-card">
                    <v-card-title>Sorting</v-card-title>
                    <v-card-text>
                        <v-select
                            v-model="filters.sortBy"
                            :items="sortOptions"
                            label="Sort By"
                            @change="applyFilters"
                            @click:clear="clearFilters">
                        </v-select>
                    </v-card-text>
                </v-card>
                <v-card class="filter-card">
                    <v-card-title>Filters</v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="filters.minPrice"
                            label="Min Price"
                            type="number"
                            @change="applyFilters"
                        ></v-text-field>
                        <v-text-field
                            v-model="filters.maxPrice"
                            label="Max Price"
                            type="number"
                            @change="applyFilters"
                        ></v-text-field>
                        <v-select
                            v-model="filters.brand"
                            :items="brands"
                            label="Brand"
                            @change="applyFilters"
                            clearable
                        ></v-select>
                        <v-select
                            v-model="filters.color"
                            :items="colors"
                            label="Color"
                            @change="applyFilters"
                            clearable
                        ></v-select>
                        <v-select
                            v-model="filters.size"
                            :items="sizes"
                            label="Size"
                            @change="applyFilters"
                            clearable
                        ></v-select>
                        <v-btn @click="resetFilters">Reset Filters</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="9">
                <v-row>
                    <v-col cols="12" class="text-center">
                        <v-col cols="12" v-if="isLoading">
                            <v-progress-circular indeterminate></v-progress-circular>
                        </v-col>
                        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
                    </v-col>
                </v-row>
                <v-row v-if="filteredProducts.length" class="products-grid" dense justify="center">
                    <v-col
                        v-for="product in filteredProducts"
                        :key="product.id"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                    >
                        <v-card class="product-card" elevation="2" @click="goToDetailedProduct(product.id)">
                            <v-img
                                v-if="product.masterVariant.images.length"
                                :src="product.masterVariant.images[0].url"
                                alt="Product Image"
                                class="product-image"
                                height="200px"
                            ></v-img>
                            <v-card-title class="product-name">
                                {{ product.name && product.name["en-GB"] ? product.name["en-GB"] : "Name Not Available" }}
                            </v-card-title>
                            <v-card-text class="product-description">
                                {{ product.description && product.description["en-GB"] ? product.description["en-GB"] : "Description Not Available" }}
                            </v-card-text>
                            <v-card-subtitle class="price">
                                <div v-if="product.masterVariant.prices.length">
                                    <template v-if="product.masterVariant.prices[0].discounted">
                                        <span class="original-price">
                                            € {{ formatPrice(product.masterVariant.prices[0].value.centAmount) }}
                                        </span>
                                        <span class="discounted-price">
                                            € {{ formatPrice(product.masterVariant.prices[0].discounted.value.centAmount) }}
                                        </span>
                                    </template>
                                    <template v-else>
                                        € {{ formatPrice(product.masterVariant.prices[0].value.centAmount) }}
                                    </template>
                                </div>
                                <span v-else class="no-price">No Price Available</span>
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-chip
                                    v-for="color in getProductColors(product)"
                                    :key="color"
                                    :style="{ backgroundColor: color }"
                                    class="color-chip"
                                ></v-chip>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row v-if="sortedProducts.length" class="products-grid" dense justify="center">
                    <v-col
                        v-for="product in sortedProducts"
                        :key="product.id"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                    >
                        <v-card class="product-card" elevation="2" @click="goToDetailedProduct(product.id)">
                            <v-img
                                v-if="product.masterVariant.images.length"
                                :src="product.masterVariant.images[0].url"
                                alt="Product Image"
                                class="product-image"
                                height="200px"
                            ></v-img>
                            <v-card-title class="product-name">
                                {{ product.name && product.name["en-GB"] ? product.name["en-GB"] : "Name Not Available" }}
                            </v-card-title>
                            <v-card-text class="product-description">
                                {{ product.description && product.description["en-GB"] ? product.description["en-GB"] : "Description Not Available" }}
                            </v-card-text>
                            <v-card-subtitle class="price">
                                <div v-if="product.masterVariant.prices.length">
                                    <template v-if="product.masterVariant.prices[0].discounted">
                                        <span class="original-price">
                                            € {{ formatPrice(product.masterVariant.prices[0].value.centAmount) }}
                                        </span>
                                        <span class="discounted-price">
                                            € {{ formatPrice(product.masterVariant.prices[0].discounted.value.centAmount) }}
                                        </span>
                                    </template>
                                    <template v-else>
                                        € {{ formatPrice(product.masterVariant.prices[0].value.centAmount) }}
                                    </template>
                                </div>
                                <span v-else class="no-price">No Price Available</span>
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-chip
                                    v-for="color in getProductColors(product)"
                                    :key="color"
                                    :style="{ backgroundColor: color }"
                                    class="color-chip"
                                ></v-chip>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .catalog-container {
        max-width: 1600px;
        margin: 0 auto;
        padding: 20px;
        font-family: Poppins, sans-serif;
    }

    .text-center {
        text-align: center;
    }

    .product-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        background-color: #fff;
        transition: transform 0.3s ease, filter 0.3s ease;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .product-card:hover {
        transform: translateY(-10px);
        filter: brightness(1.05);
    }

    .product-image {
        width: 100%;
        object-fit: cover;
    }

    .product-name {
        font-size: 20px;
        font-weight: bold;
        margin: 10px 0;
        text-align: center;
        color: #099a9a;
    }

    .product-description {
        font-size: 16px;
        color: #666666;
        text-align: left;
        margin-bottom: 10px;
        flex-grow: 1;
        height: 66px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .price {
        font-size: 20px;
        color: #099a9a;
        margin-left: auto;
        text-align: center;
    }

    .original-price {
        text-decoration: line-through;
        color: #999;
        margin-right: 10px;
    }

    .discounted-price {
        font-size: 24px;
        color: #e60000;
        font-weight: bold;
    }

    .no-price {
        font-size: 20px;
        color: #999;
        text-align: center;
        margin-bottom: 20px;
    }

    .filter-card {
        border-radius: 8px;
        padding: 20px;
        margin-top: 8px;
        margin-bottom: 20px;
    }

    .color-chip {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 4px;
    }
</style>
