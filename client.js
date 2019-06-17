const axios = require('axios');

// let jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNTYwMzU2MjI3LCJlbWFpbCI6ImF5YW5lekBlaG51c2EuY29tIn0.YyVO4VBN1SBtaqC2maeHetYdfw2WW7ggichBx1iX_Sc'
let jwt_token = 'x'
let query = "{{	allUserProfiles {    nodes {      id,      userId    }  }}"
axios({
  'method': 'post',
  'url': 'http://localhost:5000/graphql',
  'headers': {
    'Authorization': `Bearer ${jwt_token}`
  },
  body: JSON.stringify({
    query: query,
  })
}).then(function(response){
  console.log("response", response)
}).catch(function(error){
  console.log("error", error)
})