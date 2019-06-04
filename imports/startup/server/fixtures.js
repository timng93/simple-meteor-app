import {Meteor} from "meteor/meteor";
import {Users} from "../../api/users";

Meteor.startup(() => {
  if (Users.find().count() === 0) {
    Users.insert({
      _id: "1",
      firstname: "Tim",
      lastname: "Nguyen",
      email: "timtim@mail.com"
    });
  }
});
