// react hook for useState, useEffect
// import Header, PlantPage component to App (parent) 
import React, {useState, useEffect} from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

// App function
function App() {
// const for plants, setNewPlants using useState
const [plants, setNewPlants] = useState([])
// const url for data
const url = 'http://localhost:6001/plants'
// const for search,setSearch using useState
const [search, setSearch] = useState('')


// function useEffect to fetch data from server
useEffect(() => {
  fetch(url)
  .then((res) => res.json())
  .then((data) => setNewPlants(data))
}, [])


// callback function for searchPlant
const searchPlant = (newSearch) => [
  setSearch(newSearch)
]

// callback function for addPlant
const addPlant = (plant) => {
  setNewPlants(plant)
}

// callback function for updatePlant
const updatePlant = (updatedPlant) => {
  setNewPlants(plants.map(originalPlant => {
    if(updatedPlant.id === originalPlant.id){
      return updatedPlant
    } else {
      return originalPlant
    }

  }))

}

// callback function for filteredPlants
const filteredPlants = plants.filter(plant => {
  if(plant.name.toLowerCase().includes(search.toLowerCase())){
    return true 
  }
  return false
})

// callback function for updatePrice
// PATCH request for newPrice 
const updatePrice = (id, newPrice) => {
  const updatedPlant = plants.find(plant => plant.id === id);
  if (updatedPlant) {
    updatedPlant.price = newPrice;

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Update failed");
        }
      })
      .then((data) => {
        updatePlant(data);
      })
      .catch((err) => {
        console.error("Could not reach server:", err);
      });
  }
};

// callback function for deletePlant 
const deletePlant = (id) => {
  setNewPlants(plants.filter((plant) => {
    if(plant.id === id){
      return false
    }
    return true

  }))

}


// passing down callback functions to child components
  return (
    <div className="app">
      <Header />
      <PlantPage 
      plants={filteredPlants} 
      addPlant={addPlant} 
      updatePlant={updatePlant} 
      searchPlant={searchPlant}
      updatePrice={updatePrice}
      deletePlant={deletePlant}
       />
    </div>
  );
}

export default App;
