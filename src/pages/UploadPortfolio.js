
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function uploadPortfolio() {

    return(
        <div>
            <h1>Upload</h1>

            <form onSubmit={handleSignupSubmit}>
                <label htmlFor="file">File:</label>
                <input 
                type="file"
                name="file"
                value={email}
                onChange={handleEmail}
                />
            </form>
        </div>
    )
}

export default uploadPortfolio;