import {Meteor} from "meteor/meteor";
import {Clients} from "../../api/clients";

Meteor.startup(() => {
  if (Clients.find().count() === 0) {
    Clients.insert({
      _id: "1",
      firstname: "Tim",
      lastname: "Nguyen",
      email: "timtim@mail.com"
    });
  }
});
