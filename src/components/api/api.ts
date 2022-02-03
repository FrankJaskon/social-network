import axios from 'axios';

const requestPattern = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'f8e1a50a-a804-47c5-b709-d1554c611319'}
});

export const postData = async (URL: string, body = {}) => {
    const { data } = await requestPattern.post(URL, body);
    return data;
}

export const getPage = async (URL: string) => {
    const { data } = await requestPattern.get(URL);
    return data;
}

export const putData = async (URL: string, body: any = {}, config?: any) => {
    const { data } = await requestPattern.put(URL, body, config);
    return data;
}

export const profileAPI =  {
    updateUserImg: (URL: string, body: any) => {
        return putData(URL, body, {headers: {'Content-Type': 'multipart/form-data'}});
    }
}

export const usersAPI =  {
    postFollowing: (URL: string) => {
        return postData(URL);
    },
    deleteFollowing: async (URL: string) => {
        const data = await requestPattern.delete(URL);
        return data;
    }
}

export const loginAPI =  {
    getLoginData: (URL: string) => {
        return getPage(URL);
    },
    postLoginData: (URL: string, body: any) => {
        return postData(URL, body);
    },
    deleteLoginData: async (URL: string) => {
        const { data } = await requestPattern.delete(URL);
        return data;
    }
}