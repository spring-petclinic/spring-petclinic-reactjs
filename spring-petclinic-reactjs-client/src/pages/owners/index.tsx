import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { OWNERS_ADD_NEW } from "@constants/Routes";

/**
 * This is not the owners list page, it's an overview page.
 * @constructor
 */
export default function OwnersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    navigate(`/owners/find?${searchParams.toString()}`);
  };

  const lastNameSearchParam = searchParams.get("lastName") ?? "";

  return (
    <div className="container xd-container">
      <h2>Find Owners</h2>

      <form className="form-horizontal" id="search-owners-form" role="search" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="control-group" id="lastName">
            <label className="col-sm-2 control-label">Last name </label>
            <div className="col-sm-10">
              <input
                id="lastName"
                name="lastName"
                className="form-control"
                type="text"
                value={lastNameSearchParam}
                onChange={(event) => setSearchParams({ lastName: event.target.value })}
              />
              <span className="help-inline" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary">
              Find Owner
            </button>
          </div>
        </div>
      </form>
      <br />
      <Link className="btn btn-primary" to={OWNERS_ADD_NEW}>
        Add Owner
      </Link>

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
