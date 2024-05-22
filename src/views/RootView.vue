<script lang="ts">
    import { mergeProps } from "vue";
    import { useAuthStore } from "@/store";

    export default {
        data: () => ({
            isDrawerOpen: false,
            authStore: useAuthStore()
        }),
        methods: {
            mergeProps
        }
    }
</script>

<template>
    <v-layout>
        <v-app-bar class="app-bar" dense flat :elevation="8">
            <v-app-bar-title
                class="app-bar-title cursor-pointer text-h6"
                @click="$router.push('/')"
            >
                Ternion Squad
            </v-app-bar-title>

            <v-btn to="/" prepend-icon="mdi-home" exact>Home</v-btn>
            <v-btn to="/about" exact>About</v-btn>
            <v-btn to="/products" exact>Products</v-btn>
            <v-btn to="/categories" exact>Categories</v-btn>
            <v-btn to="/contact" exact>Contact</v-btn>

            <v-spacer />

            <v-btn icon="mdi-magnify"></v-btn>
            <v-btn icon="mdi-cart-heart"></v-btn>

            <template v-slot:append>
                <div class="text-center">
                    <v-menu transition="slide-x-transition">
                        <template v-slot:activator="{ props }">
                            <div class="user-container d-sm-flex cursor-pointer" v-bind="props">
                                <div v-if="authStore.isAuthorized" class="ml-5">
                                    <v-avatar color="grey-darken-3">
                                        <img
                                            width="44"
                                            height="44"
                                            alt="Default profile image"
                                            src="@/assets/img/default-avatar.svg"
                                        >
                                    </v-avatar>
                                    <span class="ml-1">
                                        Hi, {{ authStore?.user?.user?.firstName }} {{authStore?.user?.user?.lastName}}!
                                    </span>
                                </div>
                                <v-tooltip v-else location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-btn to="/login" v-bind="props" icon="mdi-account">
                                            <v-icon color="grey-lighten-1">mdi-account</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Login</span>
                                </v-tooltip>
                            </div>
                        </template>
                        <v-list v-if="authStore.isAuthorized" class="text-center">
                            <v-list-item>
                                <v-btn @click="authStore.logOut()">Logout</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </template>
        </v-app-bar>

        <v-main class="main page-content-margin">
            <RouterView />
        </v-main>

        <v-footer class="footer justify-center" app>@Copyright {{ new Date().getFullYear() }}</v-footer>
    </v-layout>
</template>

<style scoped>
    .app-bar {
        padding-left: 250px;
    }

    .app-bar-title {
        margin-inline-start: 0!important;
        flex: 0.3;
        min-width: 150px;
    }

    .user-container {
        margin-right: 250px;
    }

    .main {
        min-height: 300px;
    }

    .footer {
        padding-left: 250px;
        padding-right: 250px;
    }

    .page-content-margin {
        margin-left: 250px;
        margin-right: 250px;
    }
</style>
