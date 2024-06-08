<script lang="ts">
    import { getProductDetails } from "@/services/commercetoolsApi";
    import type { BreadcrumbItem, ProductSingle } from "@/types";

        export default {
            data: () => ({
                product: {} as ProductSingle,
                loading: true,
                overlayVisible: false,
                currentImageIndex: 0
            }),
            async mounted() {
                    const productID = this.$route.params.id as string;
                    try {
                        this.product = await getProductDetails(productID);
                        if (!this.product) {
                            this.$router.push('404');
                        }
                    }
                    catch(error) {
                        return console.error('Error fetching product:', error);
                    } finally {
                        this.loading = false;
                    }
            },
            methods: {
                getPrice(currencyCode: string): string {
                    const priceObj = this.product?.masterData?.current?.masterVariant?.prices?.find(
                        (elem) => elem.value.currencyCode === currencyCode
                    );

                    return priceObj ? (priceObj.value.centAmount / 100).toFixed(2) : "N/A";
                },
                getDiscount(): string {
                    const discountPrice = this.product?.masterData?.current?.masterVariant?.prices[0]?.discounted.value.centAmount;

                    return discountPrice ? (discountPrice / 100).toFixed(2) : "N/A";
                },
                showOverlay(index: number) {
                    this.currentImageIndex = index;
                    this.overlayVisible = true;
                }
            },
            computed: {
                breadcrumbItems(): BreadcrumbItem[] { 
                    return [
                        { title: "Home", disabled: false, to:{ name: "home" } },
                        { title: "Products", disabled: false, to:{ name: "products" } },
                        { title: this.product.masterData?.current?.name["en-GB"] || "Detailed product", disabled: true, to: ""}
                    ]
                },
                largeImages() {
                    return this.product.masterData?.current?.masterVariant?.images.map(image => {
                        return {
                            ...image,
                            url: image.url.replace(/(\.[\w\d_-]+)$/i, "-large$1")
                        };
                    }) || [];
                },
                extraLargeImages() {
                    return this.product.masterData?.current?.masterVariant?.images.map(image => {
                        return {
                            ...image,
                            url: image.url.replace(/(\.[\w\d_-]+)$/i, "-zoom$1")
                        };
                    }) || [];
                },
                showArrows() {
                    return this.largeImages.length > 1;
                }
            }
        }
</script>

<template>
    <v-container class="wrapper-container">
        <v-row>
            <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
        </v-row>
        <v-row v-if="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
        <v-row v-else-if="product">
            <v-col class="mr-10">
                <v-carousel :show-arrows="showArrows">
                    <v-carousel-item
                        v-for="(image, index) in largeImages"
                        :key="index"
                        class="carousel-item"
                        :src="image.url"
                        @click="showOverlay(index)"
                    >
                        <v-img :src="image.url" class="carousel-image" alt="Product Image"></v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col>
                <v-row class="justify-space-between pa-5">
                    <h2>{{ product.masterData?.current?.name['en-GB'] }}</h2>
                    <div v-if="product.masterData?.current.masterVariant.prices[0]?.discounted">
                        <h2>
                            <span class="discounted-price pr-5">€ {{ getDiscount() }}</span>
                            <span class="original-price">€ {{ getPrice('EUR') }}</span>
                        </h2>
                    </div>
                    <div v-else>
                        <h2>€ {{ getPrice('EUR') }}</h2>
                    </div>  
                </v-row>
                <v-row class="pa-5">
                    <p>{{ product.masterData?.current?.description['en-GB'] }}</p>
                </v-row>
            </v-col>
        </v-row>
        
        <v-overlay class="overlay-content align-center justify-center" v-model="overlayVisible" opacity="1" scrim="rgba(0, 0, 0, 1)" contained persistent>
            <v-row class="overlay-wrapper">
                <v-btn @click="overlayVisible = false">
                    x
                </v-btn>
                <v-carousel :show-arrows="showArrows">
                    <v-carousel-item 
                        v-for="(image, index) in largeImages"
                        :key="index"
                        class="modal-carousel-item"
                        :src="image.url"
                    >
                        <v-img :src="image.url" class="overlay-image" alt="Enlarged Product Image" aspect-ratio="1"></v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-row>
        </v-overlay>
    </v-container>
</template>

<style scoped>
.wrapper-container {
    overflow-x: hidden;
    max-width: 1600px;
    font-family: Poppins, sans-serif;
}

h2 {
    color: #099a9a;
}

p {
    font-size: large;
}

.carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: auto;
}

.carousel-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    cursor: pointer;
}

.discounted-price {
    font-size: 24px;
    color: #e60000;
    font-weight: bold;
}

.original-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 10px;
    font-size: 22px;
}

.overlay-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.modal-carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: auto;
}

.overlay-image {
    width: 50vw;
    height: 80vh;
    max-width: 80vw;
    max-height: 80vh;
    object-fit: contain;
    margin: auto;
}
</style>