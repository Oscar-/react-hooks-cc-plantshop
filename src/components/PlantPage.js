// import NewPlantForm, PlantList, Search components 
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

//function for plantPage
//pass down cb functions as props
function PlantPage({ plants, addPlant, updatePlant, searchPlant, updatePrice, deletePlant }) {

  //pass down cb functions to child components
  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchPlant={searchPlant} />
      <PlantList 
      plants={plants}
      updatePlant={updatePlant}  
      updatePrice={updatePrice}
      deletePlant={deletePlant}
       />
    </main>
  );
}

export default PlantPage;
