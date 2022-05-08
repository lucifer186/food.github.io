import { useEffect ,useState} from "react";
import classes from "./Available.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailabeMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const[hasError,  setHasError] = useState(false)
  useEffect(() =>{


    const fetchMeal = async () =>{
      const response = await fetch('https://reactjs-2f87c-default-rtdb.firebaseio.com/meals.json')
      const responseData = await response.json();
      if(!response.ok){
        throw new Error("Somrthing went wrong")
      }

      const loaded = [];
      for (const key in responseData){
        loaded.push({
          id: key,
          name: responseData[key].Name,
          description: responseData[key].description,
          price: responseData[key].price,

        })
      }
      setMeals(loaded)
      setIsloading(false)

    }
    
    fetchMeal().catch(error =>{
      setHasError(true)
      setIsloading(false)
    })
  } ,[]);

  if(isLoading){
    return (
      <section className = {classes.mealText}>
        <p>Loading..</p>
      </section>
    )
  }
  if(hasError){
    return (
      <section className = {classes.mealText}>
        <p>{hasError}</p>
      </section>
    )
  }
  const DummyItem = meals.map((num) => (
    <MealItem
      key={num.id}
      id = {num.id}
      name={num.name}
      description={num.description}
      price={num.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{DummyItem}</ul>
      </Card>
    </section>
  );
};

export default AvailabeMeals;
