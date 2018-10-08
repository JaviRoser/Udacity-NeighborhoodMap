import React, { Component } from "react";
import PlaceList from "./PlaceList.js";
import "../App.css";
export default class SideBar extends Component {
	render() {
		return (
			<div className="SideBar">
				<input
					type={"search"}
					id={"inputSearch"}
					value=""
					aria-label="Filter/Search"
					placeholder="Search favorite BBQ Joint"
					onChange="{inputQuery => this.handleInputQuery(inputQuery)}"
					role="search"
				/>
				<PlaceList {...this.props} />
			</div>
		);
	}
}
