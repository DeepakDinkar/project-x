export default function emailValidator(_: unknown, value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject("Invalid email address");
}