import React, { Component } from "react";
import googleMapFailureBackgroundImage from "../img/googleMapFailureBackgroundImage.jpeg";
import MapStyle from "../MapStyle";
/*Import Color Markers*/
import blueMarkerIcon from "../img/blueMarkerIcon.png";
import redMarkerIcon from "../img/redMarkerIcon.png";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow
} from "react-google-maps";

/*To Import the "X" error Found*/
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);

const MyMapComponent = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultZoom={14}
			defaultCenter={{ lat: 40.731115414225094, lng: -74.16149205544018 }}
			defaultOptions={{ styles: MapStyle }}
		>
			{props.markers &&
				props.markers
					.filter(marker => marker.isVisible)

					.map((marker, index, arr) => {
						const venueData = props.venues.find(
							bbqPlace => bbqPlace.id === marker.id
						);

						return (
							<Marker
								icon={
									marker.isOpen || arr.length === 1
										? {
												url: blueMarkerIcon,
												scaledSize: new window.google.maps.Size(
													50,
													55
												)
										  }
										: {
												url: redMarkerIcon,
												scaledSize: new window.google.maps.Size(
													40,
													45
												)
										  }
								}
								title={marker.fullName}
								key={index}
								tabIndex="0"
								position={{
									lat: parseFloat(marker.lat),
									lng: parseFloat(marker.lng)
								}}
								onClick={() => props.handleMarkerClick(marker)}
							>
								{marker.isOpen &&
									venueData.bestPhoto && (
										<InfoWindow>
											<React.Fragment>
												<p className="restaurantNameInfoWindow">
													{venueData.name}
												</p>

												<img
													className="infoWindowImage"
													src={`${
														venueData.bestPhoto
															.prefix
													}200x200${
														venueData.bestPhoto
															.suffix
													}`}
													alt={`${venueData.name}`}
												/>
												<div className="markersInfowindow">
													<p>
														{
															venueData.location
																.formattedAddress[0]
														}
													</p>
													<p>
														{
															venueData.location
																.formattedAddress[1]
														}
													</p>
													<p>
														{
															venueData.location
																.formattedAddress[2]
														}
													</p>
												</div>
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
	/*Credit to : John Kariuki (https://scotch.io/tutorials/error-handling-in-react-16-using-error-boundaries)*/
	state = {
		hasError: false
	};
	/*Error Boundary (Try/Catch)*/
	componentDidCatch() {
		this.setState({
			hasError: true
		});
	}

	componentDidMount() {
		window.gm_authFailure = () => {
			this.setState({
				hasError: true
			});
		};
	}

	render() {
		const { hasError } = this.state;

		const { errorLoadingFourSquareData } = this.props;
		return (
			<main role="main" className="MapMain">
				{errorLoadingFourSquareData && (
					<div className="showErrorMessageOnMap">
						<p>
							<span className="sadFaceFailMsg">:(</span><br></br>
								Error fetching data from FourSquare.
							<br />
							Please check your API keys or the quote was exceeded
						</p>
					</div>
				)}
				{!hasError && (
					<MyMapComponent
						role="application"
						{...this.props}
						googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDA8CQSg2h9TQmoTiQR6IqCrhFfO5QA-Ao"
						async
						defer
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: `100px` }} />}
						mapElement={<div style={{ height: `100vh` }} />}
					/>
				)}
				{/*Error Message when Map Fail loading*/}
				{hasError && (
					<div className="mapFailLoading">
						<img
							className="mapFailLoadingImage"
							src={googleMapFailureBackgroundImage}
							alt="Barbeque Food"
						/>
						<p className="mapFailLoadingMessage">
							<FontAwesomeIcon
								className="iconFailMessage"
								icon="times"
							/>
							<br />
							<span className="oopsMessage">Oops!</span>
							Failed to load Google Map API. While the issue is
							being fixed, you can look at this delicious bbq
							dish.
							<br />
							<span className="howToSolveMsg">
								The problem can be the Google API key.
							</span>
							Check the README.md file to solve the issue.
						</p>
					</div>
				)}
			</main>
		);
	}
}
