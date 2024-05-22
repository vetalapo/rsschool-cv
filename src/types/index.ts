type Address = {
    readonly id?: string;
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
};

type RegisterUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    shippingAddressStreet: string;
    shippingAddressCity: string;
    shippingAddressPostCode: string;
    shippingAddressCountry: string;
    isShippingAddressDefault: boolean;
    billingAddressStreet: string;
    billingAddressCity: string;
    billingAddressPostCode: string;
    billingAddressCountry: string;
    isBillingAddressDefault: boolean;
};

type CreateUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    addresses: Address[];
    shippingAddresses: number[];
    billingAddresses: number[];
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
};

type TokenResponse = {
    access_token: string;
    expires_in: string;
    expires_at: string;
    refresh_token: string;
    scope: string;
    token_type: string;
};

type Customer = {
    id: string;
    version: number;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: Address[];
    shippingAddressIds: string[];
    billingAddressIds: string[];
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
};

type CustomerWithToken = {
    user: Customer | null;
    cart: Cart | null;
    token: TokenResponse;
};

type Credentials = {
    email: string;
    password: string;
};

type StateFields = {
    customer?: null | CustomerWithToken;
};

type Category = {
    id: number;
    title: string;
    url: string;
    parentId: number | null;
    ctId: string | null;
};

type ProductAllData = {
    id: string;
    name: string;
    description: string;
    categories: string[];
    slug: string;
    masterVariant: {
        attributes: {
            name: string;
            value: {
                key: string;
            };
        }[];
        sku: string;
        images: {
            url: string;
            dimensions: {
                w: number;
                h: number;
            };
        }[];
        prices: {
            value: {
                centAmount: number;
            };
            discounted: {
                value: {
                    type: string;
                    currencyCode: string;
                    centAmount: number;
                };
            };
        }[];
    };
};

type ProductApiResponse = {
    total: number;
    results: ProductAllData[];
};

interface LineItem {
    id: string;
    productId: string;
    name: string;
    price: {
        value: {
            centAmount: number;
            currencyCode: string;
            fractionDigits: number;
        };
        discounted: {
            value: {
                currencyCode: string;
                centAmount: number;
                fractionDigits: number;
            };
            discount: { id: string };
        };
        id: string;
    };

    discountedPrice: {
        value: {
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
        };
        includedDiscounts: [
            {
                discount: {
                    typeId: string;
                    id: string;
                };
                discountedAmount: {
                    currencyCode: string;
                    centAmount: number;
                    fractionDigits: number;
                };
            }
        ];
    };

    productSlug: string;
    totalPrice: {
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    variant: {
        sku: string;
        images: { url: string }[];
    };
    quantity: number;
}

type Cart = {
    id: string;
    version: number;
    discountCodes: {
        discountCode: {
            id: string;
        };
        state: string;
    }[];

    lineItems: LineItem[];
    totalPrice: {
        centAmount: number;
        currencyCode: string;
        fractionDigits: number;
    };
};

type CartAPI = {
    count: number;
    limit: number;
    offset: number;
    results: Cart[];
};

export type {
    Address,
    TokenResponse,
    Customer,
    Credentials,
    CustomerWithToken,
    RegisterUser,
    CreateUser,
    StateFields,
    Category,
    ProductAllData,
    ProductApiResponse,
    Cart,
    CartAPI
};
