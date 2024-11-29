import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using React Router
import '../css/Sebastify.css';
import Navbar from './Navbar';

const Sebastify: React.FC = () => {
    const [age, setAge] = useState(37);
    const [gender, setGender] = useState('Anonymous');
    const [feelings, setFeelings] = useState({ happy: 0, sad: 0, angry: 0, other: 0 });
    const [genre, setGenre] = useState<string[]>([]);
    const [language, setLanguage] = useState('Indonesia');
    const [artist, setArtist] = useState('');
    const [year, setYear] = useState('');
    const [explanation, setExplanation] = useState('');
    const navigate = useNavigate();

    const handleSliderChange = (key: string, value: number) => {
        setFeelings({ ...feelings, [key]: value });
    };

    const handleGenreChange = (selectedGenre: string) => {
        setGenre((prev) =>
            prev.includes(selectedGenre)
                ? prev.filter((g) => g !== selectedGenre)
                : [...prev, selectedGenre]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            age,
            gender,
            feelings,
            genre,
            language,
            artist,
            year,
            explanation,
        };

        // Simulate generating song results based on formData
        const songResults = [
            {
                title: 'Kokoronashi',
                artist: 'Gumi',
                year: 2015,
                image: 'https://example.com/kokoronashi.jpg',
            },
            {
                title: 'Pretender',
                artist: 'Official Hige Dandism',
                year: 2019,
                image: 'https://example.com/pretender.jpg',
            },
            {
                title: 'Shinunoga E-Wa',
                artist: 'Fujii Kaze',
                year: 2020,
                image: 'https://example.com/shinunoga-e-wa.jpg',
            },
        ];

        navigate('/Result', { state: { songs: songResults } });
    };

    return (
        <div>
            <Navbar />
            <form className="sebastify-form" onSubmit={handleSubmit}>
                <h1>Let’s Search Your Mood Song!</h1>
                <p className="mandatory">* = mandatory</p>

                <label>Your Age?*</label>
                <div className="age-input">
                    <button type="button" onClick={() => setAge((prev) => Math.max(prev - 1, 0))}>
                        &lt;
                    </button>
                    <span>{age}</span>
                    <button type="button" onClick={() => setAge((prev) => prev + 1)}>
                        &gt;
                    </button>
                </div>

                <label>Your Gender?*</label>
                <div className="gender-input">
                    <button type="button" onClick={() => setGender('Female')}>Female</button>
                    <button type="button" onClick={() => setGender('Anonymous')}>Anonymous</button>
                    <button type="button" onClick={() => setGender('Male')}>Male</button>
                </div>

                <label>How do you Feel?*</label>
                <div className="feelings-slider">
                    {['happy', 'sad', 'angry', 'other'].map((key) => (
                        <div key={key} className="slider">
                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={feelings[key as keyof typeof feelings]}
                                onChange={(e) => handleSliderChange(key, parseInt(e.target.value, 10))}
                            />
                            <span>{feelings[key as keyof typeof feelings]}%</span>
                        </div>
                    ))}
                </div>

                <label>What is your Fav Genre?</label>
                <div className="genre-checkbox">
                    {['Pop', 'Rock', 'Country', 'Jazz', 'Blue', 'Hip-Hop', 'RnB', 'Classical', 'Folk', 'Indie', 'EDM', 'Latin', 'Metal', 'Reggae', 'Lo-Fi'].map((g) => (
                        <div key={g}>
                            <input
                                type="checkbox"
                                checked={genre.includes(g)}
                                onChange={() => handleGenreChange(g)}
                            />
                            <label>{g}</label>
                        </div>
                    ))}
                </div>

                <label>What language song do you want?*</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Indonesia">Indonesia</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    {/* Add more languages as needed */}
                </select>

                <div className="additional-inputs">
                    <label>Artist:</label>
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />

                    <label>Year:</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>

                <label>Can you explain your feel?</label>
                <textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                />

                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Sebastify;