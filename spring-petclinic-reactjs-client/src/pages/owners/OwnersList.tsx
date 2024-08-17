export default function OwnersListPage() {
  return (
    <div className="container-fluid">
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
            <tr>
              <td>
                <a href="/owners/1">George Franklin</a>
              </td>
              <td>110 W. Liberty St.</td>
              <td>Madison</td>
              <td>6085551023</td>
              <td>Leo</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/2">Betty Davis</a>
              </td>
              <td>638 Cardinal Ave.</td>
              <td>Sun Prairie</td>
              <td>6085551749</td>
              <td>Basil</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/3">Eduardo Rodriquez</a>
              </td>
              <td>2693 Commerce St.</td>
              <td>McFarland</td>
              <td>6085558763</td>
              <td>Jewel Rosy</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/4">Harold Davis</a>
              </td>
              <td>563 Friendly St.</td>
              <td>Windsor</td>
              <td>6085553198</td>
              <td>Iggy</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/5">Peter McTavish</a>
              </td>
              <td>2387 S. Fair Way</td>
              <td>Madison</td>
              <td>6085552765</td>
              <td>George</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/6">Jean Coleman</a>
              </td>
              <td>105 N. Lake St.</td>
              <td>Monona</td>
              <td>6085552654</td>
              <td>Max Samantha</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/7">Jeff Black</a>
              </td>
              <td>1450 Oak Blvd.</td>
              <td>Monona</td>
              <td>6085555387</td>
              <td>Lucky</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/8">Maria Escobito</a>
              </td>
              <td>345 Maple St.</td>
              <td>Madison</td>
              <td>6085557683</td>
              <td>Mulligan</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/9">David Schroeder</a>
              </td>
              <td>2749 Blackhawk Trail</td>
              <td>Madison</td>
              <td>6085559435</td>
              <td>Freddy</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/10">Carlos Estaban</a>
              </td>
              <td>2335 Independence La.</td>
              <td>Waunakee</td>
              <td>6085555487</td>
              <td>Lucky Sly</td>
            </tr>
            <tr>
              <td>
                <a href="/owners/11">TesFirst TestLast</a>
              </td>
              <td>TestAddress</td>
              <td>TestCity</td>
              <td>123456789</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/12">Marielle AGBO</a>
              </td>
              <td>58A Alexandre Dumas</td>
              <td>Liévin</td>
              <td>0000000000</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/13">Marielle AGBO</a>
              </td>
              <td>58A Alexandre Dumas</td>
              <td>Liévin</td>
              <td>0000000000</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/14">Marielle AGBO</a>
              </td>
              <td>58A Alexandre Dumas</td>
              <td>Liévin</td>
              <td>0000000000</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/15">Marielle AGBO</a>
              </td>
              <td>58A Alexandre Dumas</td>
              <td>Liévin</td>
              <td>0000000000</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/16">Peter Parker</a>
              </td>
              <td>12 7th St</td>
              <td>New York</td>
              <td>666666</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/17">Thomas Aquino</a>
              </td>
              <td>666 St</td>
              <td>Village</td>
              <td>0000000000</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/18">Luke Skywalker</a>
              </td>
              <td>7 I'm your father</td>
              <td>Deathstar</td>
              <td>999999</td>
              <td />
            </tr>
            <tr>
              <td>
                <a href="/owners/19">Bruce Wayne</a>
              </td>
              <td>Wayne Manor</td>
              <td>Gotham City</td>
              <td>000000</td>
              <td />
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
    </div>
  );
}
