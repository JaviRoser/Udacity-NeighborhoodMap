import React, { Component } from "react";
import PlaceListItem from "./PlaceListItem";

export default class PlaceList extends Component {
	// 	constructor(props){
	// 	super(props)
	// }
	render() {
		const { venues, onClickingAListItem } = this.props;
		return (
			// 		{props.errorLoadingFourSquareData &&(
			// 	<div></div>
			// 	)

			// }
			<ol className="bbqPlaceList" aria-labelledby="BBQ Restaurants list">
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
