export default function OwnerForm() {
  return (
    <div className="container-fluid">
      <div className="container xd-container">
        <h2>New Owner</h2>
        <form id="add-owner-form" className="form-horizontal" action="/owners/new" method="post">
          <div className="form-group has-feedback">
            <div className="form-group ">
              <label className="col-sm-2 control-label">First Name</label>

              <div className="col-sm-10">
                <input id="firstName" name="firstName" className="form-control" type="text" value="" />
              </div>
            </div>

            <div className="form-group ">
              <label className="col-sm-2 control-label">Last Name</label>

              <div className="col-sm-10">
                <input id="lastName" name="lastName" className="form-control" type="text" value="" />
              </div>
            </div>

            <div className="form-group ">
              <label className="col-sm-2 control-label">Address</label>

              <div className="col-sm-10">
                <input id="address" name="address" className="form-control" type="text" value="" />
              </div>
            </div>

            <div className="form-group ">
              <label className="col-sm-2 control-label">City</label>

              <div className="col-sm-10">
                <input id="city" name="city" className="form-control" type="text" value="" />
              </div>
            </div>

            <div className="form-group ">
              <label className="col-sm-2 control-label">Telephone</label>

              <div className="col-sm-10">
                <input id="telephone" name="telephone" className="form-control" type="text" value="" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-primary" type="submit">
                Add Owner
              </button>
            </div>
          </div>
        </form>

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
