import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(){
    super()
    this.state ={
    plants: [],
    search: ''
  }
}

componentDidUpdate(prevProps, prevState){

  console.log('prevState', prevState.search, 'currentState', this.state.search)

  if(prevState.search != this.state.search){
  const search = this.state.search.toLowerCase()
  axios.get(`http://localhost:3333/plants`)
  .then(res=>{
    let searchedPlants = res.data.plantsData.filter(plant=>{
      let found = plant.name.toLowerCase().indexOf(search)
      console.log('plant being search', plant.name,':', found)
      return found > -1
    })
    this.setState({...this.state, plants: searchedPlants
  })
  })
  }

}

componentDidMount(){
  axios.get('http://localhost:3333/plants')
  .then(res=>{
    console.log(res)
    this.setState({...this.state, plants: res.data.plantsData})
  })
}
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/


  render() {
    return (
      <main className="plant-list">
        <div className='searchBar' style={{display:'block', width: '100%', color: 'white'}}>
        <p>search <input type='text' onChange={(e)=>{
          this.setState({...this.state, search: e.target.value})
        }}value={this.state.search} /></p>
        </div>
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
