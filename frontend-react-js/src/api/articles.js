import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchArticles = async (params = {}) => {
    const response = await API.get('/articles', { params });
    return response.data.data;
};

export const fetchArticleById = async (id) => {
    const response = await API.get(`/articles/${id}`);
    return response.data;
};

export const updateArticle = async (id, articleData) => {
    const response = await API.put(`/articles/${id}`, articleData);
    return response.data;
};

export const deleteArticle = async (id) => {
    const response = await API.delete(`/articles/${id}`);
    return response.data;
};

export const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}