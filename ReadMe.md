<h3>Things that are going to be done</h3>
<hr>
This file lists the changes that need to be made in each stage. It is ordered in reverse chronological order, meaning that the last changes made will always be on top of the file, so that readers will not have to scroll all the way down with each task added.

<h3>Task 07 - Relations</h3>
<hr>
Relations relation relations. The fact is that MongoDB is a NoSQL database. It means that it is non-relational, among other things. To implement a kind of relations between documents, we use references by IDs or embed documents directly. In the task we will update our code in order to create relations between our models. We can see that an order contains the id of a record but when we retreat an order we only see the id and not the data of the record as well. We will introduce one to ne and one to many relationships between our models and populate data when needed.

Story: Our client, the record store, would like to be able to have the addresses of each user in a spesific format. They would also like to see the data of a record when an order is being retrieved so they can make their shopping cart look nice.

TODO: 1.Create a new schema called address containing a street and a city.

2.Connect the address schema with our user schema (1-to-1).

3.Using refs, connect the record schema with the order one (1-to-many).
<hr>

<h3>Task 01 - Mock database and Controllers.</h3>

Most applications made for the web have to do with some sort of data manipulation. In order to be able to manipulate our data we have to do two things first:

    - We need to define the endpoints of our app that our users will use to send
      different kinds of requests (GET, POST, DELETE, etc).
    - We have to define how do we want our data to look like and of course store them somewhere.

**Story**: Our client is a record shop owner who wants to have a list of products in the main page of their shop. They know that they want to display the title, the artist, the year, the cover image and the price for each record they have available. However, the client still doesn't have a full list of all their products. He would also like to be able to add new records to his collection.

**TODO**:

1. Please create two endpoints(routes) for the shop owner

   - `http://localhost:3000/records` -> a `GET` that will return all records of the store
   - `http://localhost:3000/records` -> a `POST` that will add a new record to the record collection

   For now you can just return a string from the above endpoints, just to make sure everything works.

2. Using `lowdb` set up a mock database for our records. It can be empty or it can contain already some fake data. Update the routes above so that they work just like they should.

   - `http://localhost:3000/records` -> should return all the records that are in our lowdb database
   - `http://localhost:3000/records` -> should add a new record to our lowdb database
