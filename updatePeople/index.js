const dynamoose = require('dynamoose')

const peopleSchema = new dynamoose.Schema({
  name: String,
  age: Number,
  city: String,
})

const PeopleModel = dynamoose.model('People', peopleSchema);

exports.handler = async(event) => {
  
  try {

    let updatedPerson = PeopleModel.update(
      {"id": `${event.pathParameters.id}`},
      JSON.parse(event.body)
      )

    const response = {
      statusCode: 200,
      body: JSON.stringify(updatedPerson)
    }

    return response;

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