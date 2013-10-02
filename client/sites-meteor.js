Meteor.subscribe('config');
Meteor.subscribe('environments');
Meteor.subscribe('groups');
Meteor.subscribe('abriviations');
db = {
    config       : new Meteor.Collection("config"),
    environments : new Meteor.Collection("environments"),
    groups       : new Meteor.Collection("groups"),
    abriviations : new Meteor.Collection("abriviations")
};

Template.show.environments = Template.table.environment = function () {
    return db.environments.find();
};

Template.table.group = function () {
    return db.groups.find();
};

Template.table.events({
    'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
});

Template.group.group = function () {
    return this.data;
};

Template.group_data.environment = function () {
    var self = this;
    var envs = [];
    db.environments.find().forEach(function(env) {
        var data =  self.environments[env.name] || {} ;
        data.name = env.name;
        envs.push(data);
    });
    return envs;
};

Template.links.links = function () {
    if ( this.links && this.links.length )
        this.links[ this.links.length - 1 ].last = true;
    return this.links;
};

Template.links.pipe = function () {
    return this.last ? '' : '|';
};

