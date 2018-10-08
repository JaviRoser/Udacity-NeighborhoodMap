import React, { Component } from "react";

export default class PlaceListItem extends Component {
	render() {
		return (
			<li className="bbqPlacesListItem">
				<p>{this.props.name}</p>
			</li>
		);
	}
}
