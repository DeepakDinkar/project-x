// Auth Endpoints
export const AUTH = Object.freeze({
  LOGIN: "/auth/login",
  SIGN_UP: "/auth/signup",
  FORGET_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  REFRESH_TOKEN: '/auth/refreshToken',
  LOGOUT: "/auth/signout",
  GOOGLE_SIGNIN: "/auth/google-login",
  GET_KEY: '/auth/get_key',
  GET_STORED_DATA: '/auth/get_stored_data',
  UPDATE_STORE_DATA: '/auth/store_data'
});

// User Endpoints
export const USER = Object.freeze({
  GET_USER: "/user/myProfile",
  UPDATE_USER: "/user/saveProfile",
  COURSES: "/user/myCourses",
  PURCHASES: "/user/myPurchase",
  BUY_COURSE: "/user/savePurchase"
});

// Courses Endpoints
export const COURSES = Object.freeze({
  ALL: "/courses",
  BANNER: "/banner",
  LOCATIONS: '/locations',
  RECOMMENDED: '/recommended',
  SIMILAR: '/similar',
  TRENDING: '/trending',
  TRAINERS: '/trainers'
});

// Verticals Endpoints
export const VERTICALS = Object.freeze({
  ALL: "/verticals",
});

export const SEARCH = Object.freeze({
  ALL: "/search",
  EXPLORE: "/search/explore",
  VERTICAL_COURSES: '/search/verticals'
});

// Checkout Endpoints
export const CHECKOUT = "/checkout";

// Qomoi Endpoints
export const QOMOI = Object.freeze({
  ALL: '/qomoi',
  REQUEST_CALLBACK: '/callback'
});
