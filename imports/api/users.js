import {Mongo} from "meteor/mongo";
import Meteor from "meteor/meteor";

if (Meteor.isServer) {
  Meteor.publish("users", function usersPublication() {
    return Users.find({owner: this.userId});
  });
}

export const Users = new Mongo.Collection("users");
