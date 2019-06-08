import {Meteor} from "meteor/meteor";
import "../imports/startup/server";

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.users.allow({
    update: function(userId, user) {
      return true;
    }
  });
});
