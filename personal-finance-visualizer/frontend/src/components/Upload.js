import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const UploadContainer = styled.div`
    background: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);
    }
`;

const InputLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    color: #ddd;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const Message = styled.p`
    color: red;
    margin-top: 10px;
`;

const Loading = styled.p`
    color: #FFD93D;
    margin-top: 10px;
`;

const Upload = ({ onUploadSuccess }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            setError("No file selected. Please choose a CSV or Excel file.");
            return;
        }

        // File type validation
        const validFormats = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        if (!validFormats.includes(file.type)) {
            setError("Invalid file format. Please upload a CSV or Excel file.");
            return;
        }

        setError("");
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            onUploadSuccess(response.data);
        } catch (error) {
            setError("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <UploadContainer>
            <InputLabel htmlFor="file-upload">Click to Upload File</InputLabel>
            <HiddenInput type="file" id="file-upload" onChange={handleFileChange} />
            {loading && <Loading>Uploading file...</Loading>}
            {error && <Message>{error}</Message>}
        </UploadContainer>
    );
};

export default Upload;
