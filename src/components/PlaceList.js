import React, { Component } from "react";
import PlaceListItem from "./PlaceListItem";

export default class PlaceList extends Component {
	render() {
		return (
			<ol className="bbqPlaceList">
				{this.props.venues &&
					this.props.venues.map((bbqPlace, index) => (
						<PlaceListItem
							key={index}
							{...bbqPlace}
							onClickingAListItem={this.props.onClickingAListItem}
						/>

					))}
					
			</ol>
		);
	}
}
