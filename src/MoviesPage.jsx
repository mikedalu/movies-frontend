import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import axiosInstance from "./axiosInstance";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Movies() {
	const [movie, setMovie] = useState([]);
	const [title, setTitle] = useState();

	const fetchMovies = async (title) => {
		if (!title) return;
		try {
			const res = await axiosInstance().get(`/search/${title}`);
			console.log(res.data);
			setMovie(res.data);
		} catch (err) {
			console.log(err, "Error in log");
		}
	};

	const handleSumitSearch = async () => {
		await fetchMovies(title);
	};
	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<div>
			<NavBar />
			<Container>
				<h1 className="">OMDB REACT - DOTNET INERVIEW PROJECT</h1>
			</Container>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Enter a movie title to search</Form.Label>
					<Form.Control type="text" placeholder="Search movie by title" onChange={(e) => setTitle(e.target.value)} />
				</Form.Group>

				<Button variant="primary" type="button" onClick={handleSumitSearch}>
					Search
				</Button>
			</Form>

			<Container>
				<div>
					<h3>Found movies</h3>
					{movie && movie.title !== undefined ? (
						<div>
							<ul>
								<li>Title: {movie.title}</li>
								<li>Year: {movie.year}</li>
								<li>Genre: {movie.genre}</li>
								<li>Plot: {movie.plot}</li>
							</ul>

							<Link to={`/details/${movie?.title}`}>
								<Button variant="success">View Details</Button>
							</Link>
						</div>
					) : (
						<h4>No movie please enter a movie name to search</h4>
					)}
				</div>
			</Container>
		</div>
	);
}

export default Movies;
