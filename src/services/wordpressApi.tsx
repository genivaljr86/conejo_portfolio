const baseurl = 'http://localhost:8000';
const postsEndpoint = '/wp-json/wp/v2/posts?per_page=';
// const categoriesEndpoint = '/wp-json/wp/v2/categories';
const mediasEndpoint = "/wp-json/wp/v2/media"
const getPosts = (count: number) =>
    new Promise((resolve, reject) => {
        const endpoint = baseurl + postsEndpoint + count;
        fetch(endpoint)
            .then(response => response.json()
                .then(json => ({
                    totalPages: response.headers.get("x-wp-totalpages"),
                    totalPosts: response.headers.get("x-wp-total"),
                    allHeaders: response.headers,
                    data: json
                })))
            .then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
    });

export const getMedias = (params: string) => {
    return new Promise((resolve, reject) => {
        const endpoint = baseurl + mediasEndpoint + "?per_page=100&" + params;
        fetch(endpoint)
            .then(response => response.json()
                .then(json => ({
                    totalPages: response.headers.get("x-wp-totalpages"),
                    totalPosts: response.headers.get("x-wp-total"),
                    allHeaders: response.headers,
                    data: json
                })))
            .then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
    });
}


export default getPosts;