import axios from 'axios';

export const postCreateFeedback = (name: String, content: String) => {
    return axios.post(import.meta.env.VITE_API + "feedback", 
    {
        name: name, 
        content: content
    });
}