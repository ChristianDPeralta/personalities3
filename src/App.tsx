import React, { useState, useEffect } from 'react';
import { animeList as localAnimeList } from './data'; 
import './App.css'; 


interface Anime {
  id: number;
  name: string;
  description: string;
  url: string;
  alt: string;
}

const App: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]); 
  const [showMore, setShowMore] = useState<number | null>(null); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

 
  useEffect(() => {
    fetch('http://localhost:8080/peralta/personalities')
      .then((response) => response.json())
      .then((data) => {
        setAnimeList(data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching anime data:', error);
        setError('Failed to load anime data. Using local data.');
        setAnimeList(localAnimeList); 
        setIsLoading(false);
      });
  }, []);

  const handleMoreClick = (index: number) => {
    setShowMore((prevState) => (prevState === index ? null : index)); 
  };

  const goToNext = () => {
    if (currentIndex < animeList.length - 1) {
      setCurrentIndex(currentIndex + 1); 
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentAnime = animeList[currentIndex];

  return (
    <div className="app-container">
      <div className="anime-card">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p> 
        ) : animeList.length > 0 ? (
          <>
            <div>
              <img src={currentAnime.url} alt={currentAnime.alt || 'Anime Image'} className="fixed-image" />
            </div>
            <h2>{currentAnime.name}</h2>
            <p>{currentIndex + 1} of {animeList.length}</p>
            <button className="toggle-button" onClick={() => handleMoreClick(currentIndex)}>
              {showMore === currentIndex ? '▲' : '▼'}
            </button>
            <p className={`description ${showMore === currentIndex ? 'show' : ''}`}>
              {currentAnime.description}
            </p>
            <div className="navigation-buttons">
              <button onClick={goToPrevious} disabled={currentIndex === 0}>Back</button>
              <button onClick={goToNext} disabled={currentIndex === animeList.length - 1}>Next</button>
            </div>
          </>
        ) : (
          <p>No anime data available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
