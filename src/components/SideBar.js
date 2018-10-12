import React, { Component } from "react";
import PlaceList from "./PlaceList.js";
import "../App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

export default class SideBar extends Component {
	state = {
		inputQuery: "",
		listBBQPlaces: []
	};

	/*Update list when user types in a search*/

	filterBBQPlaces = inputQuery => {
		if (this.state.inputQuery.trim() !== "") {
			const venues = this.props.venues.filter(venue =>
				venue.name
					.toLowerCase()
					.includes(this.state.inputQuery.toLowerCase())
			);
			return venues;
		}
		return this.props.venues;
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
						placeholder="Search favorite BBQ Joint"
						onChange={inputQuery =>
							this.handleInputQuery(inputQuery)
						}
						role="search"
					/>
				
				<PlaceList
					{...this.props}
					venues={this.filterBBQPlaces()}
					onClickingAListItem={this.props.onClickingAListItem}
				/>
				<footer className="fourSquareBrand">
					Powered By FourSquare
				</footer>
			</div>
		);
	}
}
