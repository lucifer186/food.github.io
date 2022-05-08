import AvailabeMeals from "./Available";
import MealSummary from "./MealSummary";
import { Fragment } from "react";
const Meals = () => {
  return (
    <Fragment>
       <MealSummary />
      <AvailabeMeals />
     
    </Fragment>
  );
};
export default Meals;
