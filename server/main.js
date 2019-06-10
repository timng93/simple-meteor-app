import {Meteor} from "meteor/meteor";
import "../imports/startup/server";

Meteor.startup(() => {
  // code to run on server at startup
  if (Meteor.isServer) {
    Meteor.publish("users", function usersPublication() {
      return Meteor.users.find(
        {},
        {fields: {username: 1, "emails.address": 1}}
      );
    });
  }

  Meteor.users.allow({
    update: function(userId, user) {
      return true;
    }
  });
});
