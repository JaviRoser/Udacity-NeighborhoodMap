import React, { Component } from "react";
import PlaceListItem from "./PlaceListItem";

export default class PlaceList extends Component {
	render() {
		const { venues, onClickingAListItem } = this.props;
		return (
			<ol aria-label="Location List"className="bbqPlaceList">
				{venues &&
					venues.map((bbqPlace, index) => (
						<PlaceListItem
							key={index}
							{...bbqPlace}
							onClickingAListItem={onClickingAListItem}
						/>
					))}
			</ol>
		);
	}
}
