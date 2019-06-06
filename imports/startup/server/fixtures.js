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

ServiceConfiguration.configurations.remove({
  service: "github"
});

ServiceConfiguration.configurations.insert({
  service: "github",
  client_id: "30a4f83cac500e0dcd15",
  clint_secret: "535704b2b7e42d4bd6a4ee291cc87262d2fe5b77"
});
