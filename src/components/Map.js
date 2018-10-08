import React, { Component } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow
} from "react-google-maps";

const MyMapComponent = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultZoom={14}
			defaultCenter={{ lat: 40.731115414225094, lng: -74.16149205544018 }}
		>
			{props.markers &&
				props.markers
					.filter(marker => marker.isVisible)
					.map((marker, index) => {
						const venueData = props.venues.find(
							bbqPlace => bbqPlace.id === marker.id
						);
						return (
							<Marker
								key={index}
								position={{ lat: marker.lat, lng: marker.lng }}
								onClick={() => props.handleMarkerClick(marker)}
							>
								{marker.isOpen &&
									venueData.bestPhoto && (
										<InfoWindow>
											<React.Fragment>
												<p>{venueData.name}</p>
												<img
													src={`${
														venueData.bestPhoto
															.prefix
													}200x200${
														venueData.bestPhoto
															.suffix
													}`}
													alt="BBQ Place"
												/>
											</React.Fragment>
										</InfoWindow>
									)}
							</Marker>
						);
					})}
		</GoogleMap>
	))
);

export default class Map extends Component {
	render() {
		return (
			<MyMapComponent
				{...this.props}
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDA8CQSg2h9TQmoTiQR6IqCrhFfO5QA-Ao"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100vh` }} />}
			/>
		);
	}
}
