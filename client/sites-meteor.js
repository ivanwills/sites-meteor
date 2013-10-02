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

Template.env_head.state = function () {
    var key = 'emv.'+this.name;
    console.log('get', key, ReactiveLocal.get(key));
    return ReactiveLocal.get(key) ? '' : 'hidden';
};

Template.env_head.events({
    'click th' : function () {
        var key = 'env.'+this.name;
        console.log('set', key, ReactiveLocal.get(key));
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.group.group = function () {
    for ( var i in this.data ) {
        this.data[i].group = this.name;
    }
    return this.data;
};

Template.group.state = function () {
    var key = 'group.'+this.name;
    console.log('get', key, ReactiveLocal.get(key));
    return ReactiveLocal.get(key) ? 'open' : 'closed';
};

Template.group.events({
    'click th' : function () {
        var key = 'group.'+this.name;
        console.log('set', key, ReactiveLocal.get(key));
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.group_data.display = function () {
    var key = 'group.'+this.group;
    return ReactiveLocal.get(key) ? '' : 'hidden';
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

Template.group_env.state = function () {
    var key = 'emv.'+this.name;
    console.log('get', key, ReactiveLocal.get(key));
    return ReactiveLocal.get(key) ? 'hidden' : '';
};

Template.group_env.events({
    'click td' : function () {
        var key = 'env.'+this.name;
        console.log('set', key, ReactiveLocal.get(key));
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.links.links = function () {
    if ( this.links && this.links.length )
        this.links[ this.links.length - 1 ].last = true;
    return this.links;
};

Template.links.pipe = function () {
    return this.last ? '' : '|';
};

