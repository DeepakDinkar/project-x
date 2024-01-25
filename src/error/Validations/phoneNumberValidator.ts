export default function phoneNumberValidator(_: unknown, value: string) {
    const phoneNumberRegex = /^\d{10}$/;
    if (!value || phoneNumberRegex.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
}