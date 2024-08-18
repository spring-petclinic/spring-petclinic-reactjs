/**
 * This component represents 2 scenarios: "Add new pet" and "Edit existing pet".
 * @constructor
 */
export default function PetForm() {
  return (
    <div className="container xd-container">
      <h2>New Pet</h2>
      <form id="pet" className="form-horizontal" action="/owners/1/pets/new" method="post">
        <input type="hidden" name="id" value="" />
        <div className="form-group has-feedback">
          <div className="form-group">
            <label className="col-sm-2 control-label">Owner</label>
            <div className="col-sm-10">George Franklin</div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Name</label>

            <div className="col-sm-10">
              <input id="name" name="name" className="form-control" type="text" value="" />
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Birth Date</label>

            <div className="col-sm-10">
              <input
                id="birthDate"
                name="birthDate"
                className="form-control flatpickr-input"
                type="text"
                value=""
                readOnly
              />
            </div>
          </div>

          <div className="control-group">
            <div className="form-group ">
              <label className="col-sm-2 control-label">Type </label>

              <div className="col-sm-10">
                <select id="type" name="type" className="form-control" size={5}>
                  <option value="bird">bird</option>
                  <option value="cat">cat</option>
                  <option value="dog">dog</option>
                  <option value="hamster">hamster</option>
                  <option value="lizard">lizard</option>
                  <option value="snake">snake</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-primary" type="submit">
              Add Pet
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
  );
}
