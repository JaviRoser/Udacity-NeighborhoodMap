import React, { Component } from "react";
import PlaceList from "./PlaceList.js";
import "../App.css";

export default class SideBar extends Component {
	state = {
		inputQuery: "",
		listBBQPlaces: [],
		PlaceNoFoundErr: false
	};

	/*Update list when user types in a search*/

	filterBBQPlaces = inputQuery => {
		if (this.state.inputQuery.trim() !== "") {
			const venues = this.props.venues.filter(venue =>
				venue.name
					.toLowerCase()
					.includes(this.state.inputQuery.trim().toLowerCase())
			);
			return venues;
		}
	
		return this.props.venues

	};

	handleInputQuery = inputQuery => {
		this.setState({
			inputQuery: inputQuery.target.value
		});
		const markers = this.props.venues.map(venue => {
			const markerMatchIsFound = venue.name
				.toLowerCase()
				.includes(inputQuery.target.value.toLowerCase());
			const marker = this.props.markers.find(
				marker => marker.id === venue.id
			);
			if (markerMatchIsFound) {
				marker.isVisible = true;
			} else {
				marker.isVisible = false;
			}
			return marker;
		});
		this.props.updateSuperState({ markers });
	};

	render() {
		return (
			<div className="SideBar">
				<input

					type={"search"}
					id={"inputSearch"}
					value={this.state.inputQuery}
					aria-label="Filter/Search"
					placeholder="Filter BBQ Joints"
					onChange={inputQuery => this.handleInputQuery(inputQuery)}
					role="search"
				/>
		
				<h3 className="BBQPlacesListTitle">List of BBQ Places</h3>
				<PlaceList
					{...this.props}
					venues={this.filterBBQPlaces()}
					onClickingAListItem={this.props.onClickingAListItem}
				/>
				<footer className="fourSquareBrand">
					<a
						rel="noopener"
						target="_blank"
						href="https://developer.foursquare.com/"
					>
						Powered By{" "}
						<span className="fourSquare">FourSquare</span>
					</a>
				</footer>
			</div>
		);
	}
}
