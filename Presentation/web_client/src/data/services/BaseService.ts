import axios from "axios";

export class BaseService{

    protected readonly baseUrl = "http://localhost:8080"


    protected async get<T>(url: string): Promise<T | undefined> {
        try {
            const headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            const response = await axios.get<T>(this.baseUrl + url, {
                headers: headersList
            });

            return response.data
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    protected async post<T>(url: string, item: T): Promise<T | undefined> {
        try {
            const headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            const bodyContent = JSON.stringify(item);

            const response = await axios.post<T>(this.baseUrl + url, bodyContent, {
                headers: headersList
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    protected async put<T>(url: string, item: T): Promise<T | undefined> {
        try {
            const headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            const bodyContent = JSON.stringify(item);

            const response = await axios.put<T>(this.baseUrl + url, bodyContent, {
                headers: headersList
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    protected async delete(url: string){
        try {
            const headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            const response = await axios.delete<boolean>(this.baseUrl + url, {
                headers: headersList
            });
            return response.data;
        }catch (error){
            console.error(error);
            throw error;
        }
    }
}
