import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ProductsView from "@/views/ProductsView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ContactsView from "@/views/ContactsView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import { useAuthStore } from "@/store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "root",
            component: RootView,
            children: [
                {
                    path: "/",
                    name: "home",
                    component: HomeView
                },
                {
                    path: "/products",
                    name: "products",
                    component: ProductsView
                },
                {
                    path: "/categories",
                    name: "categories",
                    component: CategoriesView
                },
                {
                    path: "/contact",
                    name: "contact",
                    component: ContactsView
                },
                {
                    path: "/about",
                    name: "about",
                    component: AboutView
                }
            ],
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: {
                requiresNonLogin: true
            }
        },
        {
            path: "/register",
            name: "registration",
            component: RegistrationView,
            meta: {
                requiresNonLogin: true
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFoundView
        }
    ]
});

router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (to.meta.requiresNonLogin && authStore.isAuthorized) {
        return { name: "root" };
    }
});

export default router;
