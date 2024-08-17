import { Link } from "react-router-dom";

export default function OwnersPage() {
  return (
    <div className="container-fluid">
      <div className="container xd-container">
        <h2>Find Owners</h2>

        <div className="form-horizontal">
          <div className="form-group">
            <div className="control-group" id="lastName">
              <label className="col-sm-2 control-label">Last name </label>
              <div className="col-sm-10">
                <input id="lastName" name="lastName" className="form-control" type="text" value="" />
                <span className="help-inline" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <Link to="/owners/find" type="button" className="btn btn-primary">
                Find Owner
              </Link>
            </div>
          </div>
        </div>
        <br />
        <Link className="btn btn-primary" to="/owners/new">
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
    </div>
  );
}
