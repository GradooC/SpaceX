import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Spinner from './UI/Spinner';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

function Launch(props) {
  const { flight_number } = props.match.params;

  return (
    <>
      <Query
        query={LAUNCH_QUERY}
        variables={{ flight_number: Number(flight_number) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) console.log(error);

          const {
            flight_number,
            mission_name,
            launch_year,
            launch_success,
            rocket: { rocket_id, rocket_name, rocket_type }
          } = data.launch;

          return (
            <div>
              <h1 className="display-4 my-3 text-center">
                <span className="text-dark">Mission: {mission_name}</span>
              </h1>
              <h4 className="mb-3 text-center">Launch Details</h4>
              <ul>
                <li className="list-group-item">
                  Flight Number: {flight_number}
                </li>
                <li className="list-group-item">Launch Year: {launch_year}</li>
                <li className="list-group-item">
                  Launch Successful:{' '}
                  <span
                    className={cn({
                      'text-success': launch_success,
                      'text-danger': !launch_success
                    })}
                  >
                    {launch_success ? 'Yes' : 'No'}
                  </span>
                </li>
              </ul>
              <h4 className="my-3 text-center">Rocket Details</h4>
              <ul>
                <li className="list-group-item">Rocker ID: {rocket_id}</li>
                <li className="list-group-item">Rocker Name: {rocket_name}</li>
                <li className="list-group-item">Rocker Type: {rocket_type}</li>
              </ul>
              <hr />
              <Link to="/" className="btn btn-secondary">
                Back
              </Link>
            </div>
          );
        }}
      </Query>
    </>
  );
}

export default Launch;
