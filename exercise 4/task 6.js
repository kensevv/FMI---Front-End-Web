var table = document.createElement("table");

table.innerHTML =  `
<caption>Table caption</caption>

<thead>
<tr>
    <th>Evidence Rating</th>
    <th>Effect</th>
    <th>Efficacy</th>
    <th>Consensus</th>
    <th>Comments</th>
</tr>
</thead>  

<tbody>
<tr>
    <td>A</td>
    <td>Power Output</td>
    <td>3 Stars</td>
    <td>80% 18 studies</td>
    <td>Lorem ipsum dolor sit amet, consectetur adispicing elit. A architecto blanditiis comque doloribus, eius enim est exercitationem harum itaque iure iusto magni nam nobis? Alias asppernatur deleniti deserunt ea vaniam!</td>
</tr>
<tr>
    <td>B</td>
    <td>Wieght</td>
    <td>4 Stars</td>
    <td>100% 65 studies</td>
    <td>Lorem ipsum dolor sit amet, consectetur adispicising elit. Ab ad corporis comque, dignissimos eaque exepturi fuga in ipsa laundantium mollitia obcaecati.</td>
</tr>
</tbody>`


document.body.appendChild(table);