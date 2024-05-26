import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import axiosInstance from "./axiosInstance";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { ListGroup } from "react-bootstrap";
import { Alert } from "bootstrap";

function Movies() {
	const [movie, setMovie] = useState([]);
	const [title, setTitle] = useState();
	const [searchHistory, setSearchHistory] = useState(() => {
		// Retrieve the search history from local storage or initialize it as an empty array
		const savedHistory = localStorage.getItem("searchHistory");
		return savedHistory ? JSON.parse(savedHistory) : [];
	});
	const fetchMovies = async (title) => {
		if (!title) {
			alert("search bar is empty");
			return;
		}
		try {
			const res = await axiosInstance().get(`/search/${title}`);
			console.log(res.data);
			setMovie(res.data);

			// Update the search history
			setSearchHistory((prevHistory) => {
				const updatedHistory = [res.data?.title, ...prevHistory].slice(0, 5); // Keep only the last 5 searches
				localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
				return updatedHistory;
			});
		} catch (err) {
			console.log(err, "Error in log");
		}
	};

	const handleSumitSearch = async (e) => {
		e.preventDefault();
		await fetchMovies(title);
	};

	return (
		<div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
			<Navigation />
			<Container>
				<h1 className="">OMDB REACT - DOTNET INERVIEW PROJECT</h1>
			</Container>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Enter a movie title to search</Form.Label>
					<Form.Control type="text" placeholder="Search movie by title" onChange={(e) => setTitle(e.target.value)} />
				</Form.Group>

				<Button variant="primary" type="summit" onClick={handleSumitSearch}>
					Search
				</Button>
			</Form>
			{searchHistory?.length > 0 ? (
				<>
					<h3 style={{ paddingTop: "25px" }}>Last 5 Searches</h3>
					<ListGroup style={{ width: "50%", paddingBottom: "25px" }}>
						{searchHistory.map((search, index) => (
							<ListGroup.Item key={index}>{search}</ListGroup.Item>
						))}
					</ListGroup>
				</>
			) : (
				""
			)}

			<Container>
				<div>
					<h3 className="heading">Found movies</h3>
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
