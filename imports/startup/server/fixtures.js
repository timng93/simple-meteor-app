import {Meteor} from "meteor/meteor";
import {Groups} from "../../api/groups";

Meteor.startup(() => {
  if (Groups.find().count() === 0) {
    Groups.insert({
      _id: "1",
      name: "Thor",
      selectedMembers: [{label: "tim"}, {label: "sam"}]
    });
    Groups.insert({
      _id: "2",
      name: "Captain America",
      selectedMembers: [{label: "tim"}, {label: "sam"}]
    });
  }
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "2723678857707399",
    secret: "572345d3d3363df7bb63ade4df544768"
  });

  Accounts.onCreateUser((options, user) => {
    if (!user.services.facebook) {
      return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];
    user.username = options.username;
    return user;
  });
});
