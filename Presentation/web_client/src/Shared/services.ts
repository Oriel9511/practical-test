export class BaseService {
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

        this.getById = async <T>(id: number): Promise<T | undefined> => {
            const response = await fetch(`${this.baseUrl}/get/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }

        this.getAll = async <T>(): Promise<T[] | undefined> => {
            const response = await fetch(`${this.baseUrl}/all`);
            if (!response.ok) {
                if (response.status === 404) {
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
    }

    baseUrl: string;
    getById: <T>(id: number) => Promise<T | undefined>;
    getAll: <T>() => Promise<T[] | undefined>;
}
