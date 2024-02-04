/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Util class for session storage to store, update and retrieve the values.
 */
export class SessionStorageUtils {
  private static isItemPresent(key: string): boolean {
    return sessionStorage.getItem(key) != null;
  }

  public static getItem(key: string): string | null {
    if (this.isItemPresent(key)) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  public static getParseItem(key: string): any {
    if (this.isItemPresent(key)) {
      const value = sessionStorage.getItem(key);
      return value && JSON.parse(value);
    }
    return null;
  }

  public static setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public static setParsedItem(key: string, value: unknown): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public static clearSession(): void {
    sessionStorage.clear();
  }
}
