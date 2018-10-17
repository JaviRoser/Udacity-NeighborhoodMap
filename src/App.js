import React, { Component } from "react";
import "./App.css";
import SquareAPI from "./API/API.js";
import Map from "./components/Map.js";
import SideBar from "./components/SideBar.js";
/*Allow to use fontAwesome Icons*/
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { slide as Menu } from "react-burger-menu";
library.add(faUtensils);

class App extends Component {
	state = {
		bbqPlace: [],
		markers: [],
		error: null,
		errorLoadingFourSquareData: false,
		/*Forrest componentDidMount*/
		updateSuperState: obj => {
			this.setState(obj);
		}
	};
	/*Close all the Markers infowindow*/
	closeInfoWindowMarkers = () => {
		const markers = this.state.markers.map(marker => {
			marker.isOpen = false;
			return marker;
		});
		this.setState({ markers: Object.assign(this.state.markers, markers) });
	};

	/* Function handle when a marker is clicked*/
	markerIsClicked = marker => {
		this.closeInfoWindowMarkers();
		marker.isOpen = true;
		this.setState({ markers: Object.assign(this.state.markers, marker) });
		const venue = this.state.venues.find(
			bbqPlace => bbqPlace.id === marker.id
		);
		/*Fetch Data from Square API*/
		SquareAPI.getBBQDetails(marker.id)
			.then(bbqDetailsResponse => {
				console.log(bbqDetailsResponse);
				const newBBQPlaceAndMarkerMatch = Object.assign(
					venue,
					bbqDetailsResponse.response.venue
				);
				if (newBBQPlaceAndMarkerMatch === null) {
					this.setState({
						errorLoadingFourSquareData: true
					});
				}
				this.setState({
					venues: Object.assign(
						this.state.venues,
						newBBQPlaceAndMarkerMatch
					)
				});
			})
			.catch(bbqDetailsResponse => {
				this.setState({
					venues: [],
					markers: []
				});
			});
	};

	/*Call when a list item is clicked.*/
	onClickingAListItem = venue => {
		const marker = this.state.markers.find(
			marker => marker.id === venue.id
		);
		this.markerIsClicked(marker);
	};

	/*Chosen Parameters to fetch the data from FourSquare API*/
	componentDidMount() {
		SquareAPI.search({
			/*Location: Newark NJ*/
			ll: "40.7282155,-74.1682744",
			query: "bbq",
			radius: 1000,
			limit: 5
		})
			// .then(placesFoundResult=>placesFoundResult.json)
			.then(placesFoundResult => {
				// 	if (!placesFoundResult.ok) {
				// 	throw Error("Error Getting data from foursquare");
				// }
				this.setState({
					venues: [],
					markers: []
				});
				const { venues } = placesFoundResult.response;
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
			})
			.catch(error => {
				this.setState({
					errorLoadingFourSquareData: true
				});
			});
	}
	render() {
		/*Handle Loading Error when fetching from FourSquare*/
		const { errorLoadingFourSquareData } = this.state;
		if (errorLoadingFourSquareData) {
			return (
				<div>
					Something Went Wrong!
					<br />
					{/*error.message*/}
				</div>
			);
		}

		return (
			<div className="App">
				<div className="App-header">
					<FontAwesomeIcon
						role="presentation"
						className="iconHeader"
						icon="utensils"
					/>
					<h1>Newark BBQ Restaurants</h1>
				</div>
				<Menu>
					<SideBar
						role={"complementary"}
						{...this.state}
						onClickingAListItem={this.onClickingAListItem}
					/>
					{errorLoadingFourSquareData && (
						<p>Error Fetching Data from FourSquare</p>
					)}
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
