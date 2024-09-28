export default function VisitsPage() {
  return (
    <div className="container xd-container">
      <h2>New Visit</h2>

      <span id="pet">
        <strong>Pet</strong>
      </span>
      <table className="table table-striped" aria-describedby="pet">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Type</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Leo</td>
            <td>2010/09/07</td>
            <td>cat</td>
            <td>George Franklin</td>
          </tr>
        </tbody>
      </table>

      <form id="visit" className="form-horizontal" action="/owners/1/pets/1/visits/new" method="post">
        <div className="form-group has-feedback">
          <div className="form-group ">
            <label className="col-sm-2 control-label">Date</label>

            <div className="col-sm-10">
              <input
                id="date"
                name="date"
                className="form-control flatpickr-input"
                type="text"
                value="2024/08/18"
                readOnly
              />

              <span className="fa fa-ok form-control-feedback" aria-hidden="true" />
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Description</label>

            <div className="col-sm-10">
              <input id="description" name="description" className="form-control" type="text" value="" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <input type="hidden" name="petId" value="1" />
            <button className="btn btn-primary" type="submit">
              Add Visit
            </button>
          </div>
        </div>
      </form>
      <br />
      <strong id="previousVisits">Previous Visits</strong>
      <table className="table table-striped" aria-describedby="previousVisits">
        <tbody>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
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
