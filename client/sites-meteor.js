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

var visible_environments = function() {
    var count = 0;
    db.environments.find().forEach( function(env) {
        var key = 'env.' + env.name;
        var value = ReactiveLocal.get(key);
        if ( value === true ) count++;
        else if (value !== false ) ReactiveLocal.set(key, false);
    });
    return count;
}

Template.group_data.loggedin = function () {
    return Meteor.userId();
};

Template.title.title = function () {
    var title = db.config.findOne({name : "title"});
    return title ? title.value : 'Sites';
};

Template.filter.filters = function () {
    var filter = db.config.find({"name" : "filters" });
    return filter && filter.value ? filter.value.length : false;
};

Template.footer.copyright = function () {
    var title = db.config.findOne({name : "copyright"});
    return title ? title.value : 'Ivan Wills 2013';
};

Template.show.environments = Template.table.environment = function () {
    return db.environments.find();
};

Template.table.group = function () {
    return db.groups.find();
};

Template.group_env.state = Template.env_head.state = function () {
    var key = 'env.' + this.name;
    return ReactiveLocal.get(key) ? '' : 'hidden';
};

Template.env_head.action = function () {
    var key = 'env.' + this.name;
    return ReactiveLocal.get(key) ? 'Hide' : 'Show';
};

Template.env_head.events({
    'click th' : function (evt, tmpl) {
        var key = 'env.' + this.name;
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.group.colspan = function () {
    return 1 + visible_environments();
};

Template.group.group = function () {
    for ( var i in this.data ) {
        this.data[i].group = this.name;
    }
    return this.data;
};

Template.group.state = function () {
    var key = 'group.' + this.name;
    return ReactiveLocal.get(key) ? 'open' : 'closed';
};

Template.group.action = function () {
    var key = 'group.' + this.name;
    return ReactiveLocal.get(key) ? 'Hide' : 'Show';
};

Template.group.events({
    'click th' : function (evt, tmpl) {
        var key = 'group.' + this.name;
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.group_data.display = function () {
    var key = 'group.' + this.group;
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

Template.show_env.state = function () {
    var key = 'env.' + this.name;
    return ReactiveLocal.get(key) ? 'hidden' : '';
};

Template.show_env.action = function () {
    var key = 'env.' + this.name;
    return ReactiveLocal.get(key) ? 'Hide' : 'Show';
};

Template.show_env.events({
    'click th' : function (evt, tmpl) {
        var key = 'env.' + this.name;
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

