import { useEffect, useCallback, useState } from 'react'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http'

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [data, setData] = useState([])

  const getMyData = useCallback((mealData) => {
    let allData = []
    for (const key in mealData) {
      allData.push({
        id: key,
        name: mealData[key].name,
        price: mealData[key].price,
        description: mealData[key].description
      })
    }
    setData(allData)
  }, [])

  const { error, isLoading, sendRequest: fetchData } = useHttp()

  useEffect(() => {
    fetchData({ url: 'https://react-test-6108b-default-rtdb.firebaseio.com/meals.json' }, getMyData)
  }, [fetchData, getMyData])

  const mealsList = data.map((meal) => (
    <MealItem
      id={ meal.id }
      key={ meal.id }
      name={ meal.name }
      description={ meal.description }
      price={ meal.price }
    />
  ));
  const render = () => {
    if (error)
      return <p>{ error }</p>
    if (isLoading)
      return <p>Loading...</p>
    if (!isLoading) {
      if (data.length > 0)
        return <ul>{ mealsList }</ul>
      return <p style={ { textAlign: 'center' } }> No Meals Found </p>
    }
  }
  return (
    <section className={ classes.meals }>
      <Card>
        {/* { !isLoading && <ul>{ mealsList }</ul> }
        { isLoading && <p>Loading...</p> } */}
        { render() }
      </Card>
    </section>
  );
};

export default AvailableMeals;
