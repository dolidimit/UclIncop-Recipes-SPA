import { useState, useEffect, useMemo } from 'react';

import * as userService from './userService';


const useRecipeState = (recipeId) => {
    const [recipe, setRecipe] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        userService.getOne(recipeId, controller.signal)
            .then(recipeResult => {
                setRecipe(recipeResult);
            })

        return () => {
            controller.abort();
        }
    }, [recipeId, controller]);

    return [
        recipe,
        setRecipe
    ]
};

export default useRecipeState;