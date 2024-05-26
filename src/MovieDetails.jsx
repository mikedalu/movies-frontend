import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import NavBar from "./NavBar";

function MovieDetails() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		alert(id);
		const fetchMovieDetails = async () => {
			try {
				const res = await axiosInstance().get(`search/${id}`);
				setMovie(res.data);
			} catch (err) {
				console.log(err, "Error fetching movie details");
			}
		};

		fetchMovieDetails();
	}, [id]);

	return (
		<div>
			<NavBar />
			<Container>
				{movie ? (
					<Card>
						<Card.Header>
							<Link to={`/`}>
								<Button variant="success">Back</Button>
							</Link>
						</Card.Header>
						<Card.Body>
							<Card.Title>{movie.title}</Card.Title>
							<Card.Img variant="top" src={movie.poster} alt={movie.title} />
							<Card.Text>{movie.plot}</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroup.Item>
								<strong>Year:</strong> {movie.year}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Rated:</strong> {movie.rated}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Released:</strong> {movie.released}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Runtime:</strong> {movie.runtime}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Genre:</strong> {movie.genre}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Director:</strong> {movie.director}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Writer:</strong> {movie.writer}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Actors:</strong> {movie.actors}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Language:</strong> {movie.language}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Country:</strong> {movie.country}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Awards:</strong> {movie.awards}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>IMDB Rating:</strong> {movie.imdbRating}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Box Office:</strong> {movie.boxOffice}
							</ListGroup.Item>
						</ListGroup>
						<Card.Footer>
							<small className="text-muted">ID: {movie.imdbID}</small>
						</Card.Footer>
					</Card>
				) : (
					<h4>Loading...</h4>
				)}
			</Container>
		</div>
	);
}

export default MovieDetails;
