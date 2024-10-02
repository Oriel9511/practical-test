/**
 * The default time-to-live for cookies in seconds (1 year).
 */
const COOKIE_TTL = 24 * 60 * 60 * 365;

/**
 * An object that provides methods for managing cookies.
 */
export const cookieManager = {
  /**
   * Gets the current document cookie string.
   * @returns {string} The current document cookie string.
   */
  get _cookieMonster() {
    return document.cookie;
  },

  /**
   * Sets the document cookie string.
   * @param {string} value - The cookie string to set.
   */
  set _cookieMonster(value) {
    document.cookie = value;
  },

  /**
   * Retrieves the value of a specific cookie.
   * @param {string} str - The name of the cookie to retrieve.
   * @returns {string|undefined} The value of the cookie, or undefined if not found.
   */
  get(str: string) {
    const parts = this._cookieMonster.split('; ');
    for (const part of parts) {
      const [key, value] = part.split(/=(.*)/);
      if (key === str) {
        return value || '';
      }
    }
  },

  /**
   * Sets a cookie with the specified key, value, and time-to-live.
   * @param {string} key - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {number} [ttl=COOKIE_TTL] - The time-to-live for the cookie in seconds.
   */
  set(key: string, value: string, ttl = COOKIE_TTL) {
    let fullCookie = [];
    if (value !== undefined) {
      fullCookie.push(`${key}=${value}`);
    }
    fullCookie = fullCookie.concat(['path=/', `max-age=${ttl}`]);
    this._cookieMonster = fullCookie.join('; ');
  },

  /**
   * Deletes a cookie by setting its expiration to the past.
   * @param {string} key - The name of the cookie to delete.
   */
  delete(key: string) {
    this.set(key, 'kill', 0);
  },
};

/**
 * Creates a debounced function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} A debounced version of the provided function.
 */
export const debounce = (func: Function, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function () {
    const args = arguments;
    clearTimeout(debounceTimer);
    // @ts-ignore
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Formats a date object or string into a YYYY-MM-DD string.
 * @param {Date|string} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a UTC date string to the local timezone ISO string without milliseconds.
 * @param {Date|string} date - The UTC date to format.
 * @returns {string} The formatted date-time string in the local timezone.
 */
export const formatDateFromUtc = (date: Date | string) => {
  const utcDate = new Date(date + 'Z');
  return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000)
    .toISOString()
    .split('.')[0];
};

/**
 * Formats a date object or string into a YYYY-MM-DD HH:MM:SS string.
 * @param {Date|string} dateTime - The date and time to format.
 * @returns {string} The formatted date-time string.
 */
export const formatDateTime = (dateTime: Date | string) => {
  if (typeof dateTime === 'string') {
    dateTime = new Date(dateTime);
  }
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = dateTime.getDate().toString().padStart(2, '0');
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Creates a SHA-256 hash of the input string.
 * @param {string} input - The string to hash.
 * @returns {Promise<string>} A promise that resolves to the hexadecimal representation of the hash.
 */
export async function createHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function formatHour(date: string | Date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatHourFromUTC(date: string | Date) {
  const utcDate = new Date(date);
  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
  );
  return localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  if (obj instanceof Object) {
    const copy = Object.create(Object.getPrototypeOf(obj)) as T;
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      Object.defineProperty(
        copy,
        prop,
        Object.getOwnPropertyDescriptor(obj, prop)!
      );
    });
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (copy as any)[key] = deepClone((obj as any)[key]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy object! Its type isn't supported.");
}
