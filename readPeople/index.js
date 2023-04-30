const dynamoose = require('dynamoose')

const peopleSchema = new dynamoose.Schema({
  name: String,
})

const PeopleModel = dynamoose.model('People', peopleSchema);

exports.handler = async(event) => {
    
    if(event.pathParameters.id){
        let foundPerson = await PeopleModel.scan("id").eq(event.pathParameters.id).exec();
        const response = {
            statusCode: 200,
            body: JSON.stringify(foundPerson),
        };
        return response;
    } else {
        let allPeople = await PeopleModel.scan().exec();
        const response = {
            statusCode: 200,
            body: JSON.stringify(allPeople),
        };
        return response;
    }
};