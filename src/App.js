import React, { Component } from "react";
import "./App.css";
import SquareAPI from "./API/API.js";
import Map from "./components/Map.js";

class App extends Component {
	constructor() {
		super();
		this.state = {
			bbqPlaces: [],
			markers: []
		};
	}
	markerIsClicked = marker => {
		this.closeMarkers();
		console.log(marker);
		marker.isOpen = true;
		console.log(this.state.markers);
		this.setState({ markers: Object.assign(this.state.markers, marker) });
	};

	closeMarkers = () => {
		const markers = this.state.markers.map(marker => {
			marker.isOpen = false;
			return marker;
		});
		this.setState({ markers: Object.assign(this.state.markers, markers) });
	};

	componentDidMount() {
		SquareAPI.search({
			near: "Newark, NJ",
			query: "bbq joint",
			limit: 5
		}).then(placesFound => {
			console.log(placesFound);
			const { venues } = placesFound.response;
			const markers = venues.map(bbqPlace => {
				return {
					lat: bbqPlace.location.lat,
					lng: bbqPlace.location.lng,
					isOpen: false,
					isVisible: true
				};
			});

			this.setState({ venues, markers });
		});
	}
	render() {
		return (
			<div className="App">
				<main className="mapContainer">
					<Map
						{...this.state}
						handleMarkerClick={this.markerIsClicked}
					/>
				</main>
			</div>
		);
	}
}

export default App;
