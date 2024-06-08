<script lang="ts">
    import { mergeProps } from "vue";
    import { useAuthStore } from "@/store";

    export default {
        data: () => ({
            isDrawerOpen: false,
            authStore: useAuthStore(),
            currentYear: new Date().getFullYear()
        }),
        methods: {
            mergeProps
        },
        computed: {
            getFullCustomerName(): string {
                const firstName = this.authStore?.user?.user?.firstName;
                const lastName = this.authStore?.user?.user?.lastName;

                return `${firstName} ${lastName}`;
            }
        }
    };
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
            <v-btn to="/products" exact>Products</v-btn>
            <v-btn to="/categories" exact>Categories</v-btn>
            <v-btn to="/about" exact>About</v-btn>
            <v-btn to="/contact" exact>Contact</v-btn>

            <v-spacer />

            <v-btn icon="mdi-magnify"></v-btn>
            <v-btn icon="mdi-cart-heart"></v-btn>

            <template v-slot:append>
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props, isActive }">
                        <div class="user-container d-sm-flex cursor-pointer mr-3">
                            <v-card
                                v-if="authStore.isAuthorized"
                                class="mx-auto d-flex align-center"
                                v-bind="props"
                            >
                                <v-avatar color="grey-darken-3 ml-1">
                                    <img
                                        width="44"
                                        height="44"
                                        alt="Default profile image"
                                        src="@/assets/img/default-avatar.svg"
                                    />
                                </v-avatar>
                                <v-card-text>
                                    <span id="customer-greeting" class="text-body-1">Hi, {{ getFullCustomerName }}!</span>
                                    <v-icon v-if="isActive" icon="mdi-menu-down"></v-icon>
                                    <v-icon v-else icon="mdi-menu-right"></v-icon>
                                </v-card-text>
                            </v-card>
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
                    <v-card>
                        <v-list v-if="authStore.isAuthorized" class="text-center">
                            <v-list-item>
                                <v-btn to="/profile" exact>Profile</v-btn>
                            </v-list-item>
                            <v-divider />
                            <v-list-item>
                                <v-btn @click="authStore.logOut()">Logout</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </template>
        </v-app-bar>

        <v-main class="main page-content-margin">
            <RouterView />
        </v-main>

        <v-footer class="footer justify-center" app>@Copyright {{ currentYear }}</v-footer>
    </v-layout>
</template>

<style scoped>
    @media only screen and (max-width: 600px) {
        .app-bar {
            padding-left: 0;
        }

        .app-bar-title {
            margin-right: 0;
        }

        .user-container {
            margin-right: 0;
        }

        #customer-greeting {
            position: relative;
            bottom: -1px;
        }

        .main {
            min-height: 300px;
        }

        .footer {
            padding-left: 0;
            padding-right: 0;
        }

        .page-content-margin {
            margin-left: 0;
            margin-right: 0;
        }
    }
    @media only screen and (max-width: 400px) {
        .app-bar-title {
            flex: 1;
        }
    }
</style>
