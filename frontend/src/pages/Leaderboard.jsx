import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get("http://localhost:5000/get_top_5_records");
                setRecords(response.data);
            } catch (err) {
                setError("Failed to fetch leaderboard data.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchRecords();
    }, []);

    if (loading) return <p>Loading leaderboard...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Victories</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{record.username}</td>
                            <td>{record.numberOfVictories}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
