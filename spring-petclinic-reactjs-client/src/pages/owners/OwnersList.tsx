import { useGetList } from "react-admin";
import { IApiOwner } from "@models/api/IApiOwner";
import { OWNERS } from "@constants/resources";
import { Link, useSearchParams } from "react-router-dom";
import { LAST_NAME } from "@constants/searchParams";

export default function OwnersList() {
  const [searchParams] = useSearchParams();

  const { data } = useGetList<IApiOwner>(OWNERS, { filter: { [LAST_NAME]: searchParams.get(LAST_NAME) } });

  return (
    <div className="container xd-container">
      <h2 id="owners">Owners</h2>

      <table id="ownersTable" className="table table-striped" aria-describedby="owners">
        <thead>
          <tr>
            <th scope="col" style={{ width: 150 }}>
              Name
            </th>
            <th scope="col" style={{ width: 200 }}>
              Address
            </th>
            <th scope="col">City</th>
            <th scope="col" style={{ width: 120 }}>
              Telephone
            </th>
            <th scope="col">Pets</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((owner) => (
            <tr key={owner.id}>
              <td>
                <Link to={`/owners/${owner.id}`}>
                  {owner.firstName} {owner.lastName}
                </Link>
              </td>
              <td>{owner.address}</td>
              <td>{owner.city}</td>
              <td>{owner.telephone}</td>
              <td>{owner.pets.map((pet) => pet.name).join(", ")}</td>
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
  );
}
