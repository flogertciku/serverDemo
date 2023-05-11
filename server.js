const express = require("express");
const { faker } = require('@faker-js/faker');
const app = express();
const port = 8000;
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
require("./config/mongoose.config");
const createCompany = () => {
    const company = {
        
        name: faker.company.companyName(),
        address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country()
        }
    };
    return company;
};
const createUser = ()=>{
    const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zipCode: faker.address.zipCode(),
          country: faker.address.country()
        }
      };
      return user;
}


const users = [
    { firstName: "Reimu",  lastName: "Hakurei"    },
    { firstName: "Marisa", lastName: "Kirisame"   },
    { firstName: "Sanae",  lastName: "Kochiya"    },
    { firstName: "Sakuya", lastName: "Izayoi"     },
    { firstName: "Momiji", lastName: "Inubashiri" }
];
const companies = [];
    
app.get("/api/users/perdorParams/:test3/:test2", (req, res) => {
    const test2=  req.params.test2
    const test3 = req.params.test3
    res.json( {test2 : test2, test3:test3} );
});
app.get("/api/users/", (req, res) => {
 
    res.json( { listaUser: users} );
});

app.post("/api/users", (req, res) => {
    // req.body will contain the form data from Postman or from React
    console.log(req.body);
    // we can push it into the users array for now...
    // later on this will be inserted into a database
    users.push(req.body);
    // we always need to respond with something
    res.json( users  );
});

// axios.put(localhost:8000/api/users/:id, useriUpdatuar)

app.put("/api/users/:id", (req, res) => {
    // we can get this `id` variable from req.params
    const index = req.params.id;
    // index = 0 
    // assuming this id is the index of the users array we can replace the user like so
    users[index] = {
        "firstName": "testtest",
        "lastName": "test2"
    };
    // users[0] =
    // we always need to respond with something
    res.json( users );
});
app.delete("/api/users/fshi/:id", (req, res) => {
    // we can get this `id` variable from req.params
    const id = req.params.id;
    // assuming this id is the index of the users array we can remove the user like so
    users.splice(id, 1);
    // we always need to respond with something
    res.json( users );
});

app.get("/api/faker/users/", (req, res) => {
    // we can get this `id` variable from req.params
    
    // assuming this id is the index of the users array we can remove the user like so
    const fakeUser = createUser()
    users.push(fakeUser)
    // we always need to respond with something
    res.json( users );

});
app.get("/api/faker/company/", (req, res) => {
    // we can get this `id` variable from req.params
    
    // assuming this id is the index of the users array we can remove the user like so
    const fakeCompany = createCompany()
    companies.push(fakeCompany)
    // we always need to respond with something
    res.json( companies );

});
app.get("/api/faker/company/users", (req, res) => {
    // we can get this `id` variable from req.params
    
    // assuming this id is the index of the users array we can remove the user like so
    const fakeCompany = createCompany()
    companies.push(fakeCompany)
    const fakeUser = createUser()
    users.push(fakeUser)
    // we always need to respond with something
    res.json( {companies: companies, users: users} );

});

    
const AllMyUserRoutes = require("./routes/user.routes");
AllMyUserRoutes(app);
app.listen( port, () => console.log(`Listening on port: ${port}`) );
