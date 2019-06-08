import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
export const Groups = new Mongo.Collection("groups");

if (Meteor.isServer) {
  Meteor.publish(
    "groups",
    (groupsPublication = () => {
      return Groups.find({});
    })
  );
  Groups.allow({
    insert: () => {
      return true;
    }
  });
}
