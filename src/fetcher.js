const BASE_URL = "http://localhost:3001"
const fetcher = async (url) => {
    let responseObject = {"errorMessage": "" , "data": []};
    try {
        const response = await fetch(BASE_URL + url);
        const responseData = await response.json();
        responseObject.data = responseData;
    } catch (error) {
        responseObject.errorMessage = error.message;
    }
    return responseObject;
}

export const getCategories = () => {
    return fetcher("/categories");
}

export const getProduct = id => {
    return fetcher(`/products?catId=${id}`);
}