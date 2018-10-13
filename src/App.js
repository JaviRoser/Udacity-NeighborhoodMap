import React, { Component } from "react";
import "./App.css";
import SquareAPI from "./API/API.js";
import Map from "./components/Map.js";
import SideBar from "./components/SideBar.js";
/*Font Awesome*/
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { slide as Menu } from 'react-burger-menu'


library.add(faUtensils, faSearch);

class App extends Component {
	state = {
		bbqPlaces: [],
		markers: [],
		/*Forrest componentDidMount*/
		updateSuperState: obj => {
			this.setState(obj);
		}
	};

	/* Function handle when a marker is clicked*/

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

	/*Close all the Marker's infowindow*/
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
	};
	componentDidMount() {
		SquareAPI.search({
			/*Newark NJ*/
			ll: "40.7282155,-74.1682744",
			query: "bbq",
			radius: 1000,
			limit: 5
		}).then(placesFound => {
			const { venues } = placesFound.response;
			console.log(placesFound);

			const markers = venues.map(bbqPlace => {
				return {
					lat: bbqPlace.location.lat,
					lng: bbqPlace.location.lng,
					isOpen: false,
					isVisible: true,
					id: bbqPlace.id
				};
			});
			console.log(placesFound.response);
			this.setState({ venues, markers });
		});
	}
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<FontAwesomeIcon className="iconHeader" icon="utensils" />
					Newark BBQ Places
				</div>
				<Menu>
				<SideBar
					{...this.state}
					onClickingAListItem={this.onClickingAListItem}
				/>
				</Menu>
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
