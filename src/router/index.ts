import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
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
                    path: "/about",
                    name: "about",
                    component: AboutView
                }
            ],
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginView
        },
        {
            path: "/register",
            name: "registration",
            component: RegistrationView
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

    if (to.meta.requiresAuth && !authStore.isAuthorized) {
        return { name: "login" };
    }
});

export default router;
