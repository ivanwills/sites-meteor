db = {
    config       : new Meteor.Collection("config"),
    environments : new Meteor.Collection("environments"),
    groups       : new Meteor.Collection("groups"),
    abriviations : new Meteor.Collection("abriviations")
};

console.log('config      ', db.config.find().count() );
console.log('environments', db.environments.find().count() );
console.log('groups      ', db.groups.find().count() );
console.log('abriviations', db.abriviations.find().count() );
