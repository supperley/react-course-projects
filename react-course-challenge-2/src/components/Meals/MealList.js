import styles from './MealList.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const MealList = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpErrorMessage, setHttpErrorMessage] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);

            const response = await fetch(
                'https://react-course-http-6e306-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
            );

            if (!response.ok) {
                throw new Error('Что-то пошло не так!');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key.id,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((err) => {
            setIsLoading(false);
            setHttpErrorMessage(err.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={styles.loading}>
                <p>Получение данных с сервера...</p>
            </section>
        );
    }

    if (httpErrorMessage) {
        return (
            <section className={styles.error}>
                <p>Произошла ошибка!</p>
            </section>
        );
    }

    const mealList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    );
};

export default MealList;
