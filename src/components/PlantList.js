// import PlantCard component 
import PlantCard from "./PlantCard";

// PlantList function
//pass down cb functions as props
// .map over plants 
function PlantList({ plants, updatePlant, updatePrice, deletePlant } ) {
  return (
    <ul className="cards">
      {plants.map(plant => (
        <PlantCard 
        key={plant.id} 
        plants={plant} 
        updatePlant={updatePlant}
        updatePrice={updatePrice}
        deletePlant={deletePlant}
         />
      ))
      
    }</ul>
  );
}

export default PlantList;
