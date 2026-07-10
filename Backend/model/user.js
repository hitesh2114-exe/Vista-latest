const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

//Schema: Defines the structure and validation rules of documents.
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

userSchema.plugin(passportLocalMongoose); //this fuction automatically adds 'username' and 'password' field and does the work of salting, hashing of password automatically.

const User = mongoose.model("User", userSchema);
//Model: A Mongoose object created from a schema that provides an interface to perform CRUD operations on a MongoDB collection.

module.exports = User;

/*
| Property    | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `type`      | Defines the data type of the field.                           |
| `required`  | Makes the field mandatory.                                    |
| `unique`    | Ensures all values are unique in the collection.              |
| `default`   | Assigns a default value if none is provided.                  |
| `trim`      | Removes leading and trailing spaces from strings.             |
| `lowercase` | Converts string values to lowercase before saving.            |
| `uppercase` | Converts string values to uppercase before saving.            |
| `minlength` | Sets the minimum allowed length for a string.                 |
| `maxlength` | Sets the maximum allowed length for a string.                 |
| `min`       | Sets the minimum allowed value for a number/date.             |
| `max`       | Sets the maximum allowed value for a number/date.             |
| `enum`      | Restricts values to a predefined list.                        |
| `match`     | Validates a string against a regular expression.              |
| `validate`  | Uses a custom validation function.                            |
| `select`    | Controls whether the field is returned in queries by default. |
| `index`     | Creates a database index for faster queries.                  |
| `sparse`    | Indexes only documents that contain the field.                |
| `immutable` | Prevents the field from being changed after creation.         |
| `alias`     | Provides an alternative name for the field.                   |
| `get`       | Defines a getter function when reading the field.             |
| `set`       | Defines a setter function when writing the field.             |
| `ref`       | References another collection for population.                 |
*/
