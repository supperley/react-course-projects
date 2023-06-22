import React from 'react';
import MealList from './MealList.js';
import PromoText from './PromoText.js';

const Meals = () => {
    return (
        <React.Fragment>
            <PromoText></PromoText>
            <MealList></MealList>
        </React.Fragment>
    );
};

export default Meals;
