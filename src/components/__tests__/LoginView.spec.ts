import { mount } from "@vue/test-utils";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/store";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/store", () => ({
    useAuthStore: vi.fn()
}));

describe("LoginView.vue", () => {
    it("renders the login form", () => {
        const wrapper = mount(LoginView);
        expect(wrapper.find("h1").text()).toBe("Welcome to oureCommerce");
        expect(wrapper.find("v-form").exists()).toBe(true);
    });

    it("displays an error message when login fails", async () => {
        const authStore = {
            logIn: vi.fn().mockResolvedValue(new Error("Login failed"))
        };
        (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(authStore);

        const wrapper = mount(LoginView);
        wrapper.setData({
            form: true,
            credentials: { email: "test@example.com", password: "password" }
        });

        await wrapper.find("v-form").trigger("submit.prevent");
        await new Promise((resolve) => setTimeout(resolve, 500)); // wait for the timeout

        expect(wrapper.vm.isLoginError).toBe(true);
        expect(wrapper.find(".text-error").exists()).toBe(true);
    });

    it("calls the login method on form submit", async () => {
        const authStore = {
            logIn: vi.fn().mockResolvedValue({})
        };
        (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(authStore);

        const wrapper = mount(LoginView);
        wrapper.setData({
            form: true,
            credentials: { email: "test@example.com", password: "password" }
        });

        await wrapper.find("v-form").trigger("submit.prevent");

        expect(authStore.logIn).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password"
        });
    });
});
