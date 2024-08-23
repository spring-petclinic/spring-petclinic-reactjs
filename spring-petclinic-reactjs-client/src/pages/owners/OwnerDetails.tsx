import { Link, Navigate, useParams } from "react-router-dom";
import { OWNERS_FIND } from "@constants/routes";
import { useGetOne } from "react-admin";
import { OWNERS } from "@constants/resources";
import { IApiOwner } from "@models/api/IApiOwner";
import { getOwnerFullName } from "../../businessUtils";

export default function OwnerDetails() {
  const { id: ownerId } = useParams();

  const idAsNumber = ownerId ? Number(ownerId) : undefined;
  const { data: owner } = useGetOne<IApiOwner>(OWNERS, { id: idAsNumber });

  if (!ownerId || !owner) {
    return <Navigate to={OWNERS_FIND} />;
  }
  return (
    <div>
      <div className="container xd-container">
        <h2 id="ownerInformation">Owner Information</h2>
        <table className="table table-striped" aria-describedby="ownerInformation">
          <tbody>
            <tr>
              <th id="name">Name</th>
              <td headers="name">
                <strong>{getOwnerFullName(owner)}</strong>
              </td>
            </tr>
            <tr>
              <th id="address">Address</th>
              <td headers="address">{owner.address}</td>
            </tr>
            <tr>
              <th id="city">City</th>
              <td headers="city">{owner.city}</td>
            </tr>
            <tr>
              <th id="telephone">Telephone</th>
              <td headers="telephone">{owner.telephone}</td>
            </tr>
          </tbody>
        </table>
        <Link to={`/owners/${ownerId}/edit`} className="btn btn-primary">
          Edit Owner
        </Link>{" "}
        <Link to={`/owners/${ownerId}/pets/new`} className="btn btn-primary">
          Add New Pet
        </Link>
        <br />
        <br />
        <br />
        <h2 id="petsAndVisits">Pets and Visits</h2>
        <table className="table table-striped" aria-describedby="petsAndVisits">
          <tbody>
            {owner.pets.map(({ id: petId, name, birthDate, type }) => (
              <tr key={petId}>
                <th scope="col">
                  <dl className="dl-horizontal">
                    <dt>Name</dt>
                    <dd>{name}</dd>
                    <dt>Birth Date</dt>
                    <dd>{birthDate}</dd>
                    <dt>Type</dt>
                    <dd>{type.name}</dd>
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
                          <Link to={`/owners/${ownerId}/pets/${petId}/edit`}>Edit Pet</Link>
                        </td>
                        <td>
                          <Link to={`/owners/${ownerId}/pets/${petId}/visits/new`}>Add Visit</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
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
    </div>
  );
}
