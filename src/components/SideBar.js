import React, { Component } from "react";
import PlaceList from "./PlaceList.js";
import "../App.css";

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
					.includes(this.state.inputQuery.trim().toLowerCase())
			);
			return venues;
		}

		/*Return a default list of restaurants*/
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
		const { errorLoadingFourSquareData } = this.props;
		
		return (
			<div className="SideBar">
				<input
					tabIndex="0"
					type={"search"}
					id={"inputSearch"}
					value={this.state.inputQuery}
					aria-label="search"
					placeholder="Filter BBQ Joints"
					onChange={inputQuery => this.handleInputQuery(inputQuery)}
					role="search"
				/>

				<h2 className="BBQPlacesListTitle">List of BBQ Places</h2>
				<PlaceList
					{...this.props}
					venues={this.filterBBQPlaces()}
					onClickingAListItem={this.props.onClickingAListItem}
				/>
				{errorLoadingFourSquareData && (
					<p className="errorLoadingFourSquareData">!Error Fetching the requested data from FourSquare.
					Please Check the README to solve the problem.</p>
				)}

				<div className="fourSquareBrand">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://developer.foursquare.com/"
					>
						Powered By
						<span className="fourSquare"> FourSquare</span>
					</a>
				</div>
			</div>
		);
	}
}
