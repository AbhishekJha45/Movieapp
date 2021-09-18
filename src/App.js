import styled from 'styled-components';
import MovieComponent from "./Components/MovieComponent";
import Axios from "axios";
import {useState} from "react"; 
import MovieInfoComponent from './Components/MovieInfoComponent';
 export const API_KEY = "66688f79";
const Container = styled.div`
display: flex;
flex-direction: column;
`;
const Header = styled.div`
display: flex;
flex-direction: row;
background-color: black;
color: white;
padding: 10px;
align-items: center;
font-size: 25px;
font width: bold;
box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
display: flex;
flex-direction: row;
align-items:center;
`;
const MovieImage =styled.img
`
width: 48px;
height: 48px;
margin: 15px;
`;
const SearchBox=styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
background-color: white;
border-radius: 10px;
margin-left: 30px;
margin-right: 0.5px;
width: 50%;
height: 30px;
background-colour: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const[timeoutId, updateTimeoutId]= useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  }
  const onTextChange =(event) =>{
     onMovieSelect("")
      clearTimeout(timeoutId)
      updateSearchQuery(event.target.value);
      const timeout = setTimeout(() => fetchData(event.target.value),500);
      updateTimeoutId(timeout);
  };
  return (
    <Container>
    <Header>
      <AppName >
        <MovieImage src="movieicon.png"></MovieImage>
        Free Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/searchicon.svg"/>
          <SearchInput 
          placeholder="Search Movie" 
          value={searchQuery}
          onChange={onTextChange}
          />
          </SearchBox>

      </Header> 
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}

      <MovieListContainer>
      {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/photo.png"/>
        )}
      

      </MovieListContainer>
    
    </Container>
  );
}

export default App;
