import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, vi, describe, it, expect, afterEach} from "vitest";
import DetailedPageView from "../DetailedPageView.vue";
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import { getProductDetails } from "@/services/commercetoolsApi";
import { createPinia, setActivePinia } from "pinia";

global.ResizeObserver = require("resize-observer-polyfill");

vi.mock('@/services/commercetoolsApi', () => ({
    getProductDetails: vi.fn()
}));  

const mockedGetProductDetails = getProductDetails as ReturnType<typeof vi.fn>;

let wrapper: VueWrapper;

beforeEach(async () => {
    const pinia = createPinia();
    setActivePinia(pinia);

    mockedGetProductDetails.mockResolvedValue({
        id: '1',
        masterData: {
            current: {
                name: { 'en-GB': 'Sample Product' },
                description: { 'en-GB': 'Sample Description' },
                masterVariant: {
                  prices: [{ value: { currencyCode: 'EUR', centAmount: 1000 } }],
                  images: [{ url: 'https://example.com/image1-large.jpg' }]
                }
            }
        }
    });

    wrapper = mount(DetailedPageView, {
        global: {
            plugins: [vuetify, router, pinia]
        }
    });

    // Navigate to the desired route
    router.push('/product/1');
    // Wait until the router has finished navigating
    await router.isReady();
});
        
afterEach(() => {
    wrapper.unmount();
});

describe("Detailed Page:", () => {
    it("renders detailed page", async () => {
        await wrapper.vm.$nextTick(); // Wait for the next DOM update cycle

        expect(mockedGetProductDetails).toHaveBeenCalled();
        expect(wrapper.find('h2').text()).toContain('Sample Product');
        expect(wrapper.find('p').text()).toContain('Sample Description');
        expect(wrapper.findAllComponents({ name: 'v-carousel-item' }).length).toBe(1);
    });
});