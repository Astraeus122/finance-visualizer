import React, { useState } from "react";
import Upload from "./components/Upload";
import Charts from "./components/Charts";
import styled from "styled-components";

const Container = styled.div`
    text-align: center;
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #121212;
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: #FFD93D;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    text-transform: uppercase;
`;

const Summary = styled.div`
    background: #1e1e1e;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    width: 80%;
    max-width: 800px;
    text-align: center;
`;

function App() {
    const [uploadData, setUploadData] = useState(null);

    return (
        <Container>
            <Title>Personal Finance Visualizer</Title>
            <Upload onUploadSuccess={setUploadData} />

            {uploadData && (
                <Summary>
                    <h2 style={{ color: "#FFD93D" }}>Summary</h2>
                    <p><strong>Total Transactions:</strong> {uploadData.total_transactions}</p>
                    <p><strong>Total Spent:</strong> ${uploadData.total_spent.toFixed(2)}</p>
                    <p><strong>Categories:</strong> {uploadData.categories.join(", ")}</p>
                    
                    <Charts data={uploadData} />
                </Summary>
            )}
        </Container>
    );
}

export default App;
