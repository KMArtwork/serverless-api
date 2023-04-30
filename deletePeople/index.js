const dynamoose = require('dynamoose')

const peopleSchema = new dynamoose.Schema({
  name: String,
})

const PeopleModel = dynamoose.model('People', peopleSchema);

exports.handler = async(event) => {

  try {
    let deletedPerson = await PeopleModel.delete(event.pathParamters.id);
    const response = {
      statusCode: 200,
      body: JSON.stringify(deletedPerson)
    }
    return response;
  } catch (e) {
      console.log(e);
      const response = {
        statusCode: 500,
        body: JSON.stringify(e)
      }
      return response;
  }


}