export default function VetsPage() {
  return (
    <div className="container-fluid">
      <div className="container xd-container">
        <h2 id="veterinarians">Veterinarians</h2>

        <div className="row">
          <table id="vetsTable" className="table table-striped" aria-describedby="veterinarians">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Specialties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>James Carter</td>
                <td>none</td>
              </tr>
              <tr>
                <td>Linda Douglas</td>
                <td>dentistry surgery</td>
              </tr>
              <tr>
                <td>Sharon Jenkins</td>
                <td>none</td>
              </tr>
              <tr>
                <td>Helen Leary</td>
                <td>radiology</td>
              </tr>
              <tr>
                <td>Rafael Ortega</td>
                <td>surgery</td>
              </tr>
              <tr>
                <td>Henry Stevens</td>
                <td>radiology</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row">
          <div className="col-md-2">
            <a href="/vets.xml">View as XML</a>
          </div>
          <div className="col-md-2">
            <a href="/vets.json">View as JSON</a>
          </div>
        </div>

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
