import React, { Component } from "react";

export default class PlaceListItem extends Component {
	render() {
		return (
			<li
				aria-labelledby="listOfBBQRestaurants"
				tabIndex="0"
				className="bbqPlacesListItem"
				onClick={() => this.props.onClickingAListItem(this.props)}
			>
				<p>{this.props.name}</p>
			</li>
		);
	}
}
