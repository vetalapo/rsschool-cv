import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AboutView from "@/views/AboutView.vue";

describe("TheWelcome", () => {
    it("renders properly", () => {
        const wrapper = mount(AboutView);

        expect(wrapper.text()).toBeTruthy();
    });
});
