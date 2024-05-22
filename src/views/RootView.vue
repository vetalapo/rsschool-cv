<script lang="ts">
    import { useAuthStore } from "@/store";

    export default {
        data: () => ({
            isDrawerOpen: false,
            authStore: useAuthStore()
        })
    }
</script>

<template>
    <v-layout>
        <v-app-bar>
            <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
            <v-app-bar-title>eCommerce Application</v-app-bar-title>
            <template v-slot:append>
                <div class="mr-4">Hi, {{ authStore?.user?.user?.firstName }} {{authStore?.user?.user?.lastName}}!</div>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="isDrawerOpen">
            <v-list>
                <v-list-item to="/" prepend-icon="mdi-home" exact>Home</v-list-item>
                <v-list-item to="/about" exact>About</v-list-item>
            </v-list>
            <v-divider />
            <template v-slot:append>
                <v-list>
                    <v-list-item @click="authStore.logOut()">Logout</v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-main class="main d-flex">
            <RouterView />
        </v-main>

        <v-footer app>@Copyright {{ new Date().getFullYear() }}</v-footer>
    </v-layout>
</template>

<style scoped>
    .main {
        min-height: 300px;
    }
</style>
