import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/css/main.css";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Set up
const pinia = createPinia();
const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark"
    }
});

// Bootstrap
app
    .use(pinia)
    .use(router)
    .use(vuetify);

app.mount("#app");
