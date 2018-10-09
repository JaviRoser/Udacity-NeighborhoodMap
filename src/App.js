import React, { Component } from "react";
import "./App.css";
import SquareAPI from "./API/API.js";
import Map from "./components/Map.js";
import SideBar from "./components/SideBar.js";

class App extends Component {
	// constructor() {
	// super();
	state = {
		bbqPlaces: [],
		markers: [],
		/*Forrest*/
		updateSuperState: obj => {
			this.setState(obj);
		}
	};
	// }

	/*To handle when a marker is clicked*/
	markerIsClicked = marker => {
		this.closeInfoWindowMarkers();

		marker.isOpen = true;

		this.setState({ markers: Object.assign(this.state.markers, marker) });
		const venue = this.state.venues.find(
			bbqPlace => bbqPlace.id === marker.id
		);

		SquareAPI.getBBQDetails(marker.id).then(bbqDetailsRespond => {
			const newBBQPlaceAndMarkerMatch = Object.assign(
				venue,
				bbqDetailsRespond.response.venue
			);
			this.setState({
				venues: Object.assign(
					this.state.venues,
					newBBQPlaceAndMarkerMatch
				)
			});
		});
	};

	/**/
	closeInfoWindowMarkers = () => {
		const markers = this.state.markers.map(marker => {
			marker.isOpen = false;
			return marker;
		});
		this.setState({ markers: Object.assign(this.state.markers, markers) });
	};

	/*Call when a list item is clicked*/

	onClickingAListItem = venue => {
		const marker = this.state.markers.find(
			marker => marker.id === venue.id
		);
		this.markerIsClicked(marker);
		console.log(venue);
	};
	componentDidMount() {
		SquareAPI.search({
			near: "Newark, NJ",
			query: "bbq",
			limit: 5
		}).then(placesFound => {
			
			const { venues } = placesFound.response;
			const markers = venues.map(bbqPlace => {
				return {
					lat: bbqPlace.location.lat,
					lng: bbqPlace.location.lng,
					isOpen: false,
					isVisible: true,
					id: bbqPlace.id
				};
			});

			this.setState({ venues, markers });
		});
	}
	render() {
		return (
			<div className="App">
				<SideBar
					{...this.state}
					onClickingAListItem={this.onClickingAListItem}
				/>
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
