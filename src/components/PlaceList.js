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
			<ol role="menu" className="bbqPlaceList" aria-labelledby="">
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
