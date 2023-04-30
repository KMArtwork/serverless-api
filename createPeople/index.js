const dynamoose = require('dynamoose')

const peopleSchema = new dynamoose.Schema({
  name: String,
})

const PeopleModel = dynamoose.model('People', peopleSchema);

exports.handler = async(event) => {

  if (!event.body) {
    const response = {
      statusCode: 500,
      body: 'Request body missing, unable to create new DB entry'
    }
  } else {

    let modelBody = JSON.parse(event.body)

    try {
      const newPerson = await PeopleModel.create(modelBody)
      const response = {
        statusCode: 200,
        body: JSON.stringify(newPerson)
      }
      return response
    }
    catch(e) {
      console.log(e);
      const response = {
        statusCode: 500,
        body: JSON.stringify(e)
      }
      return response;
    }

  }

}