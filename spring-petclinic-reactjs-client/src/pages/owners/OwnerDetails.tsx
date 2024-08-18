import { Link } from "react-router-dom";
import { OWNERS } from "@constants/Routes";

export default function OwnerDetails() {
  return (
    <div className="container xd-container">
      <h2 id="ownerInformation">Owner Information</h2>

      <table className="table table-striped" aria-describedby="ownerInformation">
        <tbody>
          <tr>
            <th id="name">Name</th>
            <td headers="name">
              <strong>George Franklin</strong>
            </td>
          </tr>
          <tr>
            <th id="address">Address</th>
            <td headers="address">110 W. Liberty St.</td>
          </tr>
          <tr>
            <th id="city">City</th>
            <td headers="city">Madison</td>
          </tr>
          <tr>
            <th id="telephone">Telephone</th>
            <td headers="telephone">6085551023</td>
          </tr>
        </tbody>
      </table>

      <Link to={`${OWNERS}/1/edit`} className="btn btn-primary">
        Edit Owner
      </Link>

      <Link to={`${OWNERS}/1/pets/new`} className="btn btn-primary">
        Add New Pet
      </Link>

      <br />
      <br />
      <br />
      <h2 id="petsAndVisits">Pets and Visits</h2>

      <table className="table table-striped" aria-describedby="petsAndVisits">
        <tbody>
          <tr>
            <th scope="col">
              <dl className="dl-horizontal">
                <dt>Name</dt>
                <dd>Leo</dd>
                <dt>Birth Date</dt>
                <dd>2010-09-07</dd>
                <dt>Type</dt>
                <dd>cat</dd>
              </dl>
            </th>
            <td>
              <table className="table-condensed" aria-describedby="petsAndVisits">
                <thead>
                  <tr>
                    <th id="visitDate">Visit Date</th>
                    <th id="visitDescription">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link to="/owners/1/pets/1/edit">Edit Pet</Link>
                    </td>
                    <td>
                      <Link to="/owners/1/pets/1/visits/new">Add Visit</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <img src="/resources/images/spring-pivotal-logo.png" alt="Sponsored by Pivotal" />
          </div>
        </div>
      </div>
    </div>
  );
}
