// Auth Endpoints
export const AUTH = Object.freeze({
  LOGIN: "/auth/login",
  SIGN_UP: "/auth/signup",
  FORGET_PASSWORD: "/auth/forgot-password",
  REFRESH_TOKEN: '/auth/refreshToken',
  LOGOUT: "/auth/signout"
});

// User Endpoints
export const USER = Object.freeze({
  GET_USER: "/user/myProfile",
  UPDATE_USER: "/user/saveProfile",
  COURSES: "/user/myCourses",
  PURCHASES: "/user/myPurchase"
});

// Courses Endpoints
export const COURSES = Object.freeze({
  All: "/courses",
  TRENDING: "/courses/trending",
  LOCATIONS: '/locations'
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
