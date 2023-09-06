const { When, Then, raw } = require('@cucumber/cucumber')
const axios = require('axios')
const { assertThat } = require('flasst')
const jsonpath  = require('jsonpath')

var baseURL = "https://api.tmsandbox.co.nz"
var response

When('I perform a GET request to the following endpoint {string}', async function (p1) {
    let axiosSettings = {
                        method:'get',
                        url:p1,
                        baseURL: baseURL,
                        }   
    
    await axios(axiosSettings).then(
        res => {
            assertThat(res.status).isEqualTo(200)
            response = res
        })
});

Then('I receive a valid payload', function () {
    assertThat(response.headers['content-type']).isEqualTo("application/json")
    assertThat(parseInt(response.headers['content-length']) > 0).isTrue
});

Then('the following data is returned', function (rowData) {
    const dataTableRows = rowData.hashes();
    dataTableRows.forEach(row => {
        let jsonPath = row['jsonPath']
        let exactMatch = row['exactMatch']
        let expectedContent = row['expectedContent']

        let element = jsonpath.query(response.data, jsonPath)
        if(exactMatch === "true"){
            assertThat(`${element}`).isEqualTo(`${expectedContent}`)
        }
        else{
            assertThat(element).contains(expectedContent)
        }
    });
  });