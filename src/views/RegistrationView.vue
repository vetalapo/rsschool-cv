<script lang="ts">
    import { ValidationRules } from "@/utils/validationRules";
    export default {
        data: () => ({
            isPasswordVisible: false,
            form: false,
            menu: false,
            birthDate: null,
            firstName: "",
            lastName: "",
            streetName: "",
            city: "",
            email: "",
            zip: "",
            country: "",
            password: "",
            loading: false,
            commonRules: ValidationRules,

            rules: {
                noSpecialChar: (value: string) => /^[a-zA-Z\s]*$/.test(value) || "No special characters allowed",
                email: (value: string) => /^[--9^-~A-Z!#-'*+=?]+@[a-z0-9A-Z](?:[a-z0-9A-Z-]{0,61}[a-z0-9A-Z]|)(?:\.[a-z0-9A-Z](?:[a-z0-9A-Z-]{0,61}[a-z0-9A-Z]|))*$/.test(value) || "Invalid Email address",
                zipCode: (value: string) => /^\d{5}$/.test(value) || "Zip code must be 5 digits",
                ageLimit: (value: string) => {
                    if (!value) {
                        return "Required";
                    }

                    const today = new Date();
                    const birthDate = new Date(value);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDifference = today.getMonth() - birthDate.getMonth();

                    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    return age >= 13 || "You must be at least 13 years old.";
                }
            }
        }),
        methods: {
            onSubmit() {
                if (!this.form) {
                    return;
                }

                this.loading = true;

                setTimeout(() => (this.loading = false), 3000);
            }
        }
    }
</script>


<template>
    <v-layout>
        <v-main id="registration-container" class="d-sm-flex align-center justify-space-around ga-16">
            <div class="text-container d-flex flex-column align-center text-center mb-8">
                <h1 class="text-center">Join us<br>today!</h1>
                <h2 class="text-center pa-4">Sign up to get access to exclusive features and benefits.</h2>
            </div>
            <v-card
                class="pa-12 pb-8"
                elevation="8"
                max-width="448"
                rounded="lg"
            >

                <v-form v-model="form" @submit.prevent="onSubmit">
                    <div class="app-logo text-center d-sm-flex justify-center ga-5">
                        <h2 class="brand">eCommerce</h2><span class="app">app</span>
                    </div>

                    <div class="cta-form">
                        <h3 class="text-center pa-6">Sign up to get goods <br><span>you love</span></h3>
                    </div>

                    <div class="text-subtitle-1 text-medium-emphasis">Registration</div>

                        <v-row class="mb-1">
                            <v-col>
                                <v-text-field
                                    v-model="firstName"
                                    :rules="[
                                        commonRules.required,
                                        rules.noSpecialChar,
                                        commonRules.minLength(1, 'First name must be at least 1 character long')]"
                                    density="compact"
                                    placeholder="First Name"
                                    variant="outlined"
                                    clearable
                                >
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="lastName"
                                    :rules="[
                                        commonRules.required,
                                        rules.noSpecialChar,
                                        commonRules.minLength(1, 'First name must be at least 1 character long')]"
                                    density="compact"
                                    placeholder="Last Name"
                                    variant="outlined"
                                    clearable
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-model="birthDate"
                                    prepend-inner-icon="mdi-calendar"
                                    placeholder="Day of Birth"
                                    readonly
                                    density="compact"
                                    variant="outlined"
                                    v-bind="props"
                                    :rules="[commonRules.required, rules.ageLimit]"
                                    @click="menu = true"
                                >
                                </v-text-field>
                            </template>
                            <v-date-picker
                                ref="picker"
                                v-model="birthDate"
                                @input="menu = false"
                                type="date"
                            >
                            </v-date-picker>
                        </v-menu>

                        <v-row class="mt-1">
                            <v-col>
                                <v-text-field
                                    v-model="streetName"
                                    :rules="[
                                        commonRules.required,
                                        commonRules.minLength(1, 'First name must be at least 1 character long')
                                    ]"
                                    density="compact"
                                    placeholder="Street"
                                    variant="outlined"
                                    clearable
                                >
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="city"
                                    :rules="[
                                        commonRules.required,
                                        rules.noSpecialChar,
                                        commonRules.minLength(1, 'First name must be at least 1 character long')
                                    ]"
                                    density="compact"
                                    placeholder="City"
                                    variant="outlined"
                                    clearable
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                    <v-text-field
                        class="mb-4"
                        v-model="zip"
                        :rules="[commonRules.required, rules.zipCode]"
                        density="compact"
                        placeholder="Postal Code"
                        variant="outlined"
                        clearable
                    >
                    </v-text-field>

                    <v-select
                        v-model="country"
                        :items="['Germany (DE)', 'United States (US)']"
                        density="compact"
                        label="Select a country"
                        variant="outlined"
                    >
                    </v-select>

                    <v-text-field
                        class="mb-4"
                        v-model="email"
                        :rules="[commonRules.required, rules.email]"
                        density="compact"
                        placeholder="Email address"
                        prepend-inner-icon="mdi-email-outline"
                        variant="outlined"
                        clearable
                    >
                    </v-text-field>

                    <v-text-field
                        class="mb-5"
                        v-model="password"
                        :readonly="loading"
                        :rules="[
                            commonRules.required,
                            commonRules.minLength(8, 'Min 8 characters'),
                            commonRules.minOneDigit,
                            commonRules.minOneLowerCase,
                            commonRules.minOneUpperCase,
                            commonRules.minOneSpecialChar,
                            commonRules.noLeadingTrailingWhitespace
                        ]"
                        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        density="compact"
                        placeholder="Password"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="isPasswordVisible = !isPasswordVisible"
                        clearable
                    >
                    </v-text-field>
                    <v-btn
                        :disabled="!form"
                        :loading="loading"
                        type="submit"
                        class="mb-8"
                        color="blue"
                        size="large"
                        variant="tonal"
                        block
                    >
                        Create an account
                    </v-btn>

                    <v-divider />

                    <v-card-text class="text-center">
                        <p>Already have an account?</p>
                        <RouterLink class="text-blue text-decoration-none" to="/login">
                            Log in <v-icon icon="mdi-chevron-right"></v-icon>
                        </RouterLink>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-main>
    </v-layout>
</template>

<style scoped>
    #registration-container {
        background:
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url("../assets/img/eCommerce-registration.svg") left no-repeat,
            url("../assets/img/backgroundRegistration.png") center / cover no-repeat;
    }

    h1 {
        font-size: 96px;
        font-family: Poppins;
        font-weight: 300;
        line-height: 144px;
    }

    .app-logo .brand {
        font-family: Prata;
        font-size: 40px;
        font-weight: 400;
    }

    .app-logo .app {
        font-family: Poppins;
        transform: rotate(-90deg);
    }

    .cta-form h3 {
        color: #099A9A;
    }

    .cta-form span {
        font-weight: 300;
    }

    .text-container h2 {
        color: #099A9A;
    }
</style>