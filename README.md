# Zeotap ClickHouse & Flat File Data Ingestion Tool

## Project Overview

This web-based application facilitates bidirectional data ingestion between ClickHouse and Flat File platforms. The application allows users to:
- **Transfer data from ClickHouse to Flat File**.
- **Transfer data from Flat File to ClickHouse**.
- Select specific columns for ingestion.
- Authenticate ClickHouse using JWT tokens.
- Report the total number of records processed upon completion.

## Core Features

1. **Bidirectional Data Flow**:
   - **ClickHouse → Flat File**: Data can be transferred from a selected ClickHouse table to a flat file.
   - **Flat File → ClickHouse**: Data from a local flat file can be ingested into a ClickHouse database.

2. **Source Selection**:
   - Users can select the data source: `ClickHouse` or `Flat File`.
   
3. **ClickHouse Authentication**:
   - Users need to provide a JWT token for ClickHouse authentication when it's selected as a source.

4. **Schema Discovery & Column Selection**:
   - Fetch a list of available tables (ClickHouse) or the schema of the Flat File.
   - Users can select specific columns for ingestion.

5. **Ingestion Process**:
   - The data is transferred from the selected source to the target platform based on the user's selections.
   - Efficient data handling is implemented using batching/streaming.

6. **Error Handling**:
   - Basic error handling for connection, authentication, and ingestion errors with user-friendly messages.

7. **Completion Reporting**:
   - The app displays the total number of records processed after ingestion.

## Bonus Feature (Optional - Not Implemented)

- **Multi-Table Join**: This feature allows users to select multiple ClickHouse tables and join them based on user-provided keys/conditions. This feature was planned, but it has not been implemented in the current version.

## Technology Stack

### Frontend
- **React.js**: For building the user interface and managing application state.
- **Bootstrap**: For styling and layout components.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: For backend API logic and handling data ingestion.
- **Express.js**: For building RESTful APIs.
- **ClickHouse Client**: To interact with the ClickHouse database.
- **JWT**: For authentication to ClickHouse using JWT tokens.

## Installation

### Prerequisites

- **Node.js** (v14 or above)
- **ClickHouse** (local or cloud-based instance)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/aryankaushik5565/Zeotap-clickHouse.git
   cd Zeotap-clickHouse
