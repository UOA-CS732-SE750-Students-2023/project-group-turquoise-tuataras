import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getRecipeBySpoonacularId, searchRecipes} from "../../src/spoonacular/queries.js";
import recipeData from '../testData/recipeData_631814.json';
import spoonacularRecipeData from '../testData/spoonacularRecipeData_631814.json';

const axiosMock= new MockAdapter(axios);
afterEach(() =>{
    axiosMock.reset();
});

describe('getRecipes', () => {
    it('should return a list of recipes', async () => {
        const results = [
            {
                "id": 631814,
                "title": "$50,000 Burger",
                "image": "https://spoonacular.com/recipeImages/631814-312x231.jpg",
                "imageType": "jpg"
            },
            {
                "id": 642539,
                "title": "Falafel Burger",
                "image": "https://spoonacular.com/recipeImages/642539-312x231.png",
                "imageType": "png"
            },
            {
                "id": 663050,
                "title": "Tex-Mex Burger",
                "image": "https://spoonacular.com/recipeImages/663050-312x231.jpg",
                "imageType": "jpg"
            }
        ]
        const data = {results: results};

        axiosMock.onGet(`https://api.spoonacular.com/recipes/complexSearch`,
            { params: { query: "burger", apiKey: "12345" } })
            .reply(200, data);

        const response = await searchRecipes({query: 'burger'});

        expect(response).toEqual(results);
        expect(axiosMock.history.get.length).toBe(1);
        expect(axiosMock.history.get[0].url)
            .toEqual('https://api.spoonacular.com/recipes/complexSearch');
        expect(axiosMock.history.get[0].params).toEqual({ query: "burger", apiKey: "12345" });
    });
});

describe('getRecipeBySpoonacularId', () => {
    it('should return recipe when valid recipe id sent', async () => {
        axiosMock.onGet(`https://api.spoonacular.com/recipes/631814/information`,
            {params: {includeNutrition: true, apiKey: "12345"}})
            .reply(200, spoonacularRecipeData);

        const response = await getRecipeBySpoonacularId(631814);
        expect(response).toEqual(recipeData);
        expect(axiosMock.history.get.length).toBe(1);
        expect(axiosMock.history.get[0].url)
            .toEqual('https://api.spoonacular.com/recipes/631814/information');
        expect(axiosMock.history.get[0].params).toEqual({includeNutrition: true, apiKey: "12345"});
    });

    it('should throw error when non-existent recipe id sent', async () => {
        axiosMock.onGet(`https://api.spoonacular.com/recipes/0/information`,
            {params: {includeNutrition: true, apiKey: "12345"}})
            .reply(404, 'Not Found');

        await expect(getRecipeBySpoonacularId(0)).rejects.toThrow('Request failed with status code 404');
        expect(axiosMock.history.get.length).toBe(1);
        expect(axiosMock.history.get[0].url)
            .toEqual('https://api.spoonacular.com/recipes/0/information');
        expect(axiosMock.history.get[0].params).toEqual({includeNutrition: true, apiKey: "12345"});
    });
});