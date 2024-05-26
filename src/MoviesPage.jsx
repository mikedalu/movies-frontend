import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";

function Movies() {
	const [movies, setMovies] = useState([]);

	const fetchMovies = async () => {
		const res = await axios.get("");
		setMovies(res.data);
	};
	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<div>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="#home">Movie OMDB </Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#home">Home</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container>
				<h1 className="">OMDB REACT - DOTNET INERVIEW PROJECT</h1>
			</Container>
		</div>
	);
}

export default Movies;
